import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiConfigService } from '../../shared/services/api-config.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { PublicStrategy } from '../auth/public.strategy';
import { TypeLicenseRepository } from '../type-license/type-license.repository';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { UserSettingsRepository } from '../user/user-settings.repository';
import { LicenseController } from './license.controller';
import { LicenseRepository } from './license.repository';
import { LicenseService } from './license.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LicenseRepository, TypeLicenseRepository, UserRepository, UserSettingsRepository]),
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
  ],
  controllers: [LicenseController],
  exports: [LicenseService, JwtModule],
  providers: [LicenseService, JwtStrategy, PublicStrategy, UserService],
})
export class LicenseModule {}
