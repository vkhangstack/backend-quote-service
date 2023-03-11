import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiConfigService } from '../../shared/services/api-config.service';
import { MailerService } from '../mailer/mailer.service';
import { OtpRepository } from '../otp/otp.repository';
import { OtpService } from '../otp/otp.service';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';
import { UserSettingsRepository } from '../user/user-settings.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PublicStrategy } from './public.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: ApiConfigService) => ({
        privateKey: configService.authConfig.privateKey,
        // if you want to use token with expiration date
        signOptions: {
          expiresIn: configService.authConfig.jwtExpirationTime,
        },
      }),
      inject: [ApiConfigService],
    }),
    TypeOrmModule.forFeature([OtpRepository, UserRepository, UserSettingsRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PublicStrategy, MailerService, OtpService],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
