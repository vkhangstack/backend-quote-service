import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiConfigService } from '../../shared/services/api-config.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { PublicStrategy } from '../auth/public.strategy';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { UserSettingsRepository } from '../user/user-settings.repository';
import { LicenseController } from './type-license.controller';
import { TypeLicenseRepository } from './type-license.repository';
import { TypeLicenseService } from './type-license.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeLicenseRepository, UserRepository, UserSettingsRepository]),
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
  exports: [TypeLicenseService, JwtModule],
  providers: [TypeLicenseService, JwtStrategy, PublicStrategy, UserService],
})
export class TypeLicenseModule {}
