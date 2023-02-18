import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';
import type { FindConditions } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import type { PageDto } from '../../common/dto/page.dto';
import { RoleType } from '../../constants/role-type';
import { FileNotImageException, UserNotFoundException } from '../../exceptions';
import { IFile } from '../../interfaces';
import { ApiConfigService } from '../../shared/services/api-config.service';
// import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { ValidatorService } from '../../shared/services/validator.service';
import type { Optional } from '../../types';
import { CreateRootDto } from '../auth/dto/CreateRootDto';
import { UserRegisterDto } from '../auth/dto/UserRegisterDto';
import { CreateSettingsCommand } from './commands/create-settings.command';
import { CreateSettingsDto } from './dtos/create-settings.dto';
import type { UserDto } from './dtos/user.dto';
import type { UsersPageOptionsDto } from './dtos/users-page-options.dto';
import type { UserEntity } from './user.entity';
import { StatusUser } from './user.enum';
import { UserRepository } from './user.repository';
import type { UserSettingsEntity } from './user-settings.entity';
import { UserSettingsRepository } from './user-settings.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private userSettingsRepository: UserSettingsRepository,
    private validatorService: ValidatorService,
    // private awsS3Service: AwsS3Service,
    private apiConfigService: ApiConfigService,
    private commandBus: CommandBus,
  ) {}

  /**
   * Find single user
   */
  findOne(findData: FindConditions<UserEntity>): Promise<Optional<UserEntity>> {
    return this.userRepository.findOne(findData);
  }

  async findByUsernameOrEmail(
    options: Partial<{ username: string; email: string; phone: string }>,
  ): Promise<Optional<UserEntity>> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect<UserEntity, 'user'>('user.settings', 'settings');

    if (options.email) {
      queryBuilder.orWhere('user.email = :email', {
        email: options.email,
      });
    }

    if (options.username) {
      queryBuilder.orWhere('user.username = :username', {
        username: options.username,
      });
    }

    if (options.phone) {
      queryBuilder.orWhere('user.phone = :phone', {
        username: options.username,
      });
    }

    const user = await queryBuilder.getOne();

    if (user) {
      return user;
    }

    return user!;
  }

  @Transactional()
  async createUser(userRegisterDto: UserRegisterDto, file: IFile): Promise<UserEntity> {
    const user = this.userRepository.create({
      ...userRegisterDto,
    });

    if (file && !this.validatorService.isImage(file.mimetype)) {
      throw new FileNotImageException();
    }

    // if (file) {
    //   user.avatar = await this.awsS3Service.uploadImage(file);
    // }s

    await this.userRepository.save(user);

    user.settings = await this.createSettings(
      user.id,
      plainToClass(CreateSettingsDto, {
        isEmailVerified: false,
        isPhoneVerified: false,
        isStatus: StatusUser.INACTIVE,
      }),
    );

    return user;
  }

  @Transactional()
  async createRoot(createRootDto: CreateRootDto): Promise<UserEntity> {
    const root = await this.findByUsernameOrEmail({
      username: createRootDto.username,
    });

    if (root) {
      throw new Error('Root already exist! ');
    }

    if (createRootDto.key !== this.apiConfigService.appConfig.appKey) {
      throw new Error('Key wrong!');
    }

    const user = this.userRepository.create({
      firstName: 'Supper',
      lastName: 'Admin',
      role: RoleType.ADMIN,
      email: createRootDto.email,
      password: createRootDto.password,
      username: createRootDto.username,
      phone: createRootDto.phone,
    });

    await this.userRepository.save(user);

    user.settings = await this.createSettings(
      user.id,
      plainToClass(CreateSettingsDto, {
        isEmailVerified: false,
        isPhoneVerified: false,
        isStatus: StatusUser.INACTIVE,
      }),
    );

    return user;
  }

  async getUsers(pageOptionsDto: UsersPageOptionsDto): Promise<PageDto<UserDto>> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }

  async getUser(userId: Uuid): Promise<UserDto> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    queryBuilder.where('user.id = :userId', { userId });

    const userEntity = await queryBuilder.getOne();

    if (!userEntity) {
      throw new UserNotFoundException();
    }

    return userEntity.toDto();
  }

  async createSettings(userId: Uuid, createSettingsDto: CreateSettingsDto): Promise<UserSettingsEntity> {
    return this.commandBus.execute<CreateSettingsCommand, UserSettingsEntity>(
      new CreateSettingsCommand(userId, createSettingsDto),
    );
  }

  async validateUserSettings(userId: Uuid): Promise<any> {
    const record = await this.userSettingsRepository.findOne({ where: { userId } });

    if (!record) {
      throw new Error('User settings not found!');
    }

    if (record.isEmailVerified !== true) {
      return { isEmailVerified: false };
    }

    if (record.isPhoneVerified !== true) {
      return { isPhoneVerified: false };
    }

    return false;
  }
}
