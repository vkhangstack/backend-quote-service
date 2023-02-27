import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, UploadedFile, Version } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Logger } from 'winston';

import type { ResponseDto } from '../../common/dto/response.dto';
import { RoleType } from '../../constants';
import { MessageServerCode, ServerCode } from '../../constants/system.enum';
import { ApiFile, Auth, AuthUser } from '../../decorators';
import { UserNotFoundException } from '../../exceptions';
import { IFile } from '../../interfaces';
import { MailerService } from '../mailer/mailer.service';
import { OtpChannel } from '../otp/otp.enum';
import { OtpService } from '../otp/otp.service';
import { UserDto } from '../user/dtos/user.dto';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthEnum, MessageAuthEnum } from './auth.enum';
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
    private mailerService: MailerService,
    private otpService: OtpService,

    @Inject('winston')
    private loggerService: Logger,
  ) {}

  @Post('createRoot')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: CreateRootDto,
    description: 'Create account root with key app generate',
  })
  async createRoot(@Body() createRoot: CreateRootDto): Promise<ResponseDto<{ otpId: string }> | ResponseDto<string[]>> {
    try {
      this.loggerService.info('Create root execute');
      this.loggerService.debug('createRoot receive body', createRoot);
      const createdUser = await this.userService.createRoot(createRoot);

      //   create otp Code
      const otpCode = await this.otpService.create(createdUser);

      // send email
      if (otpCode?.isChannel === OtpChannel.EMAIL) {
        await this.mailerService.sendMail({
          from: 'system@example.com',
          to: `${createdUser.email}`,
          subject: 'Request create user admin',
          text: `Hello ${createdUser.firstName} ${createdUser.lastName},
               your account has been created. Please check your email to activate your account.`,
          html: `<p>Hello ${createdUser.firstName} ${createdUser.lastName},
              your account has been created. Please check your email to activate your account.</p><p>OTP Code: ${otpCode.code}</p>`,
          // headers: {
          //   'Content-Type': 'text/html',
          // },
        });

        return {
          code: AuthEnum.CREATE_ADMIN_SUCCESS,
          data: { otpId: otpCode.id },
          message: MessageAuthEnum.CREATE_ADMIN_SUCCESS,
        };
      }

      return {
        code: AuthEnum.CREATE_ADMIN_FAILURE,
        data: [],
        message: MessageAuthEnum.CREATE_ADMIN_FAILURE,
      };
    } catch (error) {
      this.loggerService.error('createRoot error', error);

      return {
        code: ServerCode.ERROR,
        data: [],
        message: MessageServerCode.ERROR,
      };
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'Login account with username or email or phone and password',
  })
  @ApiException(() => [UserNotFoundException])
  async login(@Body() userLoginDto: UserLoginDto): Promise<ResponseDto<LoginPayloadDto> | ResponseDto<string[]>> {
    try {
      this.loggerService.info('User login execute');
      this.loggerService.debug('User login receive body', userLoginDto);
      const userEntity = await this.authService.validateUser(userLoginDto);

      if (!userEntity) {
        return {
          code: AuthEnum.LOGIN_FAILURE,
          data: [],
          message: MessageAuthEnum.LOGIN_FAILURE,
        };
      }

      const token = await this.authService.createAccessToken({
        userId: userEntity.id,
        role: userEntity.role,
      });

      return {
        code: AuthEnum.LOGIN_SUCCESS,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        data: new LoginPayloadDto(userEntity.toDto(), token),
        message: MessageAuthEnum.LOGIN_SUCCESS,
      };
    } catch (error) {
      this.loggerService.error('User login error by', error);

      return {
        code: ServerCode.ERROR,
        data: [],
        message: MessageServerCode.ERROR,
      };
    }
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserRegisterDto, description: 'Successfully Registered' })
  @ApiFile({ name: 'avatar' })
  async userRegister(
    @Body() userRegisterDto: UserRegisterDto,
    @UploadedFile() file: IFile,
  ): Promise<ResponseDto<{ otpId: string }> | ResponseDto<string[]>> {
    try {
      const createdUser = await this.userService.createUser(userRegisterDto, file);
      // send email
      const otpCode = await this.otpService.create(createdUser);

      // send email
      if (otpCode.isChannel === OtpChannel.EMAIL) {
        await this.mailerService.sendMail({
          from: 'system@example.com',
          to: `${createdUser.email}`,
          subject: 'Create a account user successfully',
          text: `Hello ${createdUser.firstName} ${createdUser.lastName},
             your account has been created. Please check your email to activate your account.`,
          html: `<p>Hello ${createdUser.firstName} ${createdUser.lastName}, 
            your account has been created. Please check your email to activate your account.</p><p>OTP Code: ${otpCode.code}</p>`,
          // headers: {
          //   'Content-Type': 'text/html',
          // },
        });
      }

      return {
        code: AuthEnum.CREATE_USER_SUCCESS,
        data: {
          otpId: otpCode.id,
        },
        message: MessageAuthEnum.CREATE_USER_SUCCESS,
      };
    } catch (error) {
      this.loggerService.error('User login error', error);

      return {
        code: ServerCode.ERROR,
        data: [],
        message: MessageServerCode.ERROR,
      };
    }
  }

  @Version('1')
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.USER, RoleType.ADMIN])
  @ApiOkResponse({ type: UserDto, description: 'Get current user info' })
  getCurrentUser(@AuthUser() user: UserEntity): ResponseDto<UserDto> | ResponseDto<string[]> {
    try {
      this.loggerService.info('AuthController execute func getCurrentUser');
      this.loggerService.debug('AuthController execute func getCurrentUser get data', user);

      return {
        code: AuthEnum.GET_USER_SUCCESS,
        data: user.toDto({ isActive: true }),
        message: MessageAuthEnum.GET_USER_SUCCESS,
      };
    } catch (error) {
      this.loggerService.error('AuthController execute func getCurrentUser error', error);

      return {
        code: ServerCode.ERROR,
        data: [],
        message: MessageServerCode.ERROR,
      };
    }
  }
}
