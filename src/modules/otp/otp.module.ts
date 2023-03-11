import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserSettingsRepository } from '../user/user-settings.repository';
import { OtpController } from './otp.controller';
import { OtpRepository } from './otp.repository';
import { OtpService } from './otp.service';

@Module({
  imports: [TypeOrmModule.forFeature([OtpRepository, UserSettingsRepository])],
  providers: [OtpService],
  exports: [OtpService],
  controllers: [OtpController],
})
export class OtpModule {}
