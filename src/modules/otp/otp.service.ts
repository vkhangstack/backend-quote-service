import { Injectable } from '@nestjs/common';

import { GeneratorProvider } from '../../providers';
import { StatusUser } from '../user/user.enum';
import { UserSettingsEntity } from '../user/user-settings.entity';
import { UserSettingsRepository } from '../user/user-settings.repository';
import type { VerifyOtpDto } from './dtos/verify.otp.dto';
import { OtpEntity } from './otp.entity';
import { OtpStatus } from './otp.enum';
import { OtpRepository } from './otp.repository';

@Injectable()
export class OtpService {
  constructor(private optRepository: OtpRepository, private userSettingsRepository: UserSettingsRepository) {}

  async create(userId: Uuid): Promise<OtpEntity> {
    const otp = this.optRepository.create({
      userId,
      code: GeneratorProvider.generateCode(),
      isStatus: OtpStatus.CREATED,
      createdBy: 'system',
      createdAt: new Date(),
    });

    await this.optRepository.save(otp);

    return otp;
  }

  async checkOtp(otpDto: VerifyOtpDto): Promise<boolean> {
    const otp = await this.optRepository.findOne({ where: { userId: otpDto.userId } });

    // check expire code
    if (otp?.code === otpDto.code) {
      try {
        await this.optRepository
          .createQueryBuilder()
          .update(OtpEntity)
          .set({ isStatus: OtpStatus.VERIFIED, updatedBy: 'system', updatedAt: new Date() })
          .where('id = :id', { id: otp?.id })
          .execute();

        await this.userSettingsRepository
          .createQueryBuilder()
          .update(UserSettingsEntity)
          .set({ isEmailVerified: true, isStatus: StatusUser.ACTIVE, updatedAt: new Date() })
          .where('user_id = :userId', { userId: otp?.userId })
          .execute();

        return true;
      } catch {
        return false;
      }
    }

    return false;
  }
}
