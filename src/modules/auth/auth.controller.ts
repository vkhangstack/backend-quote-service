import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, UploadedFile, Version } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Logger } from 'winston';

import type { ResponseDto } from '../../common/dto/response.dto';
import { RoleType } from '../../constants';
import { ApiFile, Auth, AuthUser } from '../../decorators';
import { UserNotFoundException } from '../../exceptions';
import { IFile } from '../../interfaces';
import { UserDto } from '../user/dtos/user.dto';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { CreateRootDto } from './dto/CreateRootDto';
import { LoginPayloadDto } from './dto/LoginPayloadDto';
import { UserLoginDto } from './dto/UserLoginDto';
import { UserRegisterDto } from './dto/UserRegisterDto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    @Inject('winston')
    private loggerService: Logger,
  ) {}

  @Post('createRoot')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'Create account root with key app generate',
  })
  async createRoot(@Body() createRoot: CreateRootDto): Promise<ResponseDto<UserDto> | ResponseDto<string[]>> {
    try {
      this.loggerService.info('Create root execute');
      this.loggerService.debug('createRoot receive body', createRoot);
      const createdUser = await this.userService.createRoot(createRoot);

      return {
        code: HttpStatus.OK,
        data: createdUser.toDto({
          isActive: true,
        }),
        message: 'Create root success!',
      };
    } catch (error) {
      this.loggerService.error('createRoot error', error);

      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: [],
        message: 'Server error unknown',
      };
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'User info with access token',
  })
  @ApiException(() => [UserNotFoundException])
  async userLogin(@Body() userLoginDto: UserLoginDto): Promise<ResponseDto<LoginPayloadDto> | ResponseDto<string[]>> {
    try {
      this.loggerService.info('User login execute');
      this.loggerService.debug('User login receive body', userLoginDto);
      const userEntity = await this.authService.validateUser(userLoginDto);

      const token = await this.authService.createAccessToken({
        userId: userEntity.id,
        role: userEntity.role,
      });

      return {
        code: HttpStatus.OK,
        data: new LoginPayloadDto(userEntity.toDto(), token),
        message: 'Login success!',
      };
    } catch (error) {
      this.loggerService.error('User login error', error);

      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: [],
        message: 'Server error unknown',
      };
    }
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto, description: 'Successfully Registered' })
  @ApiFile({ name: 'avatar' })
  async userRegister(
    @Body() userRegisterDto: UserRegisterDto,
    @UploadedFile() file: IFile,
  ): Promise<ResponseDto<UserDto> | ResponseDto<string[]>> {
    try {
      const createdUser = await this.userService.createUser(userRegisterDto, file);

      return {
        code: HttpStatus.OK,
        data: createdUser.toDto({ isActive: true }),
        message: 'Register user successful',
      };
    } catch (error) {
      this.loggerService.error('User login error', error);

      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: [],
        message: 'Server error unknown',
      };
    }
  }

  @Version('1')
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.USER, RoleType.ADMIN, RoleType.ROOT])
  @ApiOkResponse({ type: UserDto, description: 'current user info' })
  getCurrentUser(@AuthUser() user: UserEntity): ResponseDto<UserDto> | ResponseDto<string[]> {
    try {
      this.loggerService.info('AuthController execute func getCurrentUser');
      this.loggerService.debug('AuthController execute func getCurrentUser get data', user);

      return {
        code: HttpStatus.OK,
        data: user.toDto(),
        message: 'Get info user successful!',
      };
    } catch (error) {
      this.loggerService.error('User login error', error);

      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: [],
        message: 'Server error unknown',
      };
    }
  }
}
