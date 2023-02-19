import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import { GeneratorProvider } from '../../providers';
import { ApiConfigService } from '../../shared/services/api-config.service';
import type { UserEntity } from '../user/user.entity';
import { StatusUser } from '../user/user.enum';
import { UserSettingsEntity } from '../user/user-settings.entity';
import { UserSettingsRepository } from '../user/user-settings.repository';
import { VerifyOtpDto } from './dtos/verify.otp.dto';
import { OtpEntity } from './otp.entity';
import { OtpChannel, OtpStatus } from './otp.enum';
import { OtpRepository } from './otp.repository';

@Injectable()
export class OtpService {
  constructor(
    private optRepository: OtpRepository,
    private userSettingsRepository: UserSettingsRepository,
    private configService: ApiConfigService,
  ) {}

  async create(user: UserEntity): Promise<OtpEntity> {
    const otp = this.optRepository.create({
      userId: user.id,
      code: GeneratorProvider.generateCode(),
      isStatus: OtpStatus.CREATED,
      createdBy: 'system',
      createdAt: new Date(),
      expiredAt: Date.now() + this.configService.otpConfig.expireIn,
    });

    if (user?.email) {
      otp.isChannel = OtpChannel.EMAIL;
    }

    if (user?.phone) {
      otp.isChannel = OtpChannel.SMS;
    }

    await this.optRepository.save(otp);

    return otp;
  }

  @Transactional()
  async checkOtp(otpDto: VerifyOtpDto): Promise<boolean> {
    const otp = await this.optRepository.findOne({ where: { id: otpDto.otpId } });

    // check expire code
    switch (true) {
      case otp?.isStatus === OtpStatus.EXPIRED:
      case otp?.isStatus === OtpStatus.VERIFIED:
      case otp?.isStatus === OtpStatus.PENDING:
      case Number(otp?.expiredAt) <= Date.now():
        return false;
      default:
        if (otp?.code === otpDto.code) {
          await this.optRepository
            .createQueryBuilder()
            .update(OtpEntity)
            .set({ isStatus: OtpStatus.VERIFIED, updatedBy: 'system', updatedAt: new Date() })
            .where('id = :id', { id: otp?.id })
            .execute();

          const userSettings = this.userSettingsRepository.createQueryBuilder().update(UserSettingsEntity);

          if (otp?.isChannel === OtpChannel.EMAIL) {
            userSettings.set({ isEmailVerified: true, isStatus: StatusUser.ACTIVE, updatedAt: new Date() });
          }

          if (otp?.isChannel === OtpChannel.SMS || otp?.isChannel === OtpChannel.CALL) {
            userSettings.set({ isPhoneVerified: true, isStatus: StatusUser.ACTIVE, updatedAt: new Date() });
          }

          await userSettings.where('user_id = :userId', { userId: otp?.userId }).execute();

          return true;
        }

        break;
    }

    return false;
  }
}
