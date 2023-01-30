import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import { daysToTimestamp } from '../../common/utils';
import { ApiConfigService } from '../../shared/services/api-config.service';
import { GeneratorService } from '../../shared/services/generator.service';
import { IUserEntity, UserEntity } from '../user/user.entity';
import { CreateLicenseDto } from './dto/create-license.dto';
import type { SearchLicenseDto } from './dto/search-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';
import { LicenseEntity } from './entities/license.entity';
import { STATUS } from './license.enum';
import { LicenseRepository } from './license.repository';

@Injectable()
export class LicenseService {
  constructor(
    private licenseRepository: LicenseRepository,
    private readonly generateService: GeneratorService,
    private jwtService: JwtService,
    private readonly configService: ApiConfigService,
  ) {}

  @Transactional()
  async create(createLicenseDto: CreateLicenseDto, user: IUserEntity): Promise<LicenseEntity> {
    const licenseKey = this.generateService.randomHex();

    const model = this.licenseRepository.create({
      ...createLicenseDto,
      status: STATUS.INACTIVE,
      userId: user.id,
      licenseKey,
      createdBy: user.username,
    });
    await this.licenseRepository.save(model);

    return model;
  }

  @Transactional()
  async updateLicense(updateLicenseDto: UpdateLicenseDto, user: UserEntity): Promise<any> {
    const record = await this.licenseRepository.findOne({ id: updateLicenseDto.licenseId });
    const expires = daysToTimestamp(Number(record?.dayExpire));

    if (Number(record?.status) === STATUS.ACTIVE) {
      return HttpStatus.CONFLICT;
    }

    const licenseToken = await this.jwtService.signAsync(
      { licenseKey: record?.licenseKey },
      {
        algorithm: 'HS256',
        privateKey: this.configService.authConfig.privateKey,
        expiresIn: `${record?.dayExpire}d`,
      },
    );

    await this.licenseRepository
      .createQueryBuilder()
      .update(LicenseEntity)
      .set({
        status: STATUS.ACTIVE,
        updatedAt: new Date(),
        updatedBy: user.username,
        expires,
        licenseToken,
      })
      .where('id = :id', { id: updateLicenseDto.licenseId })
      .execute();

    return {
      licenseToken,
      licenseKey: record?.licenseKey,
      expireIn: expires,
      dayExpire: record?.dayExpire,
      createdAt: record?.createdAt,
      updatedBy: user.username,
    };
  }

  async findAll(searchLicenseDto: SearchLicenseDto): Promise<LicenseEntity[]> {
    if (!searchLicenseDto.status) {
      return this.licenseRepository.find();
    }

    return this.licenseRepository.find({ status: searchLicenseDto.status });
  }

  async checkLicenseKey(licenseKey: string): Promise<any> {
    const record = await this.licenseRepository.findOne({ where: { licenseKey } });

    if (!record) {
      return -1;
    }

    if (record && record?.expires < Date.now()) {
      return -2;
    }

    return record?.licenseKey;
  }

  findOne(id: Uuid) {
    return this.licenseRepository.findOne({ id });
  }

  update(id: number, updateLicenseDto: UpdateLicenseDto) {
    return `This action updates a #${id} license ${updateLicenseDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} license`;
  }
}
