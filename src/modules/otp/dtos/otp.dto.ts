import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { OtpEntity } from '../otp.entity';

export class OtpDto extends AbstractDto {
  @ApiProperty()
  createdBy?: string;

  @ApiProperty()
  updatedBy?: string;

  @ApiProperty()
  userId: Uuid;

  @ApiProperty()
  code: string;

  @ApiProperty()
  isStatus?: string;

  @ApiProperty()
  expiredAt: number;

  constructor(otp: OtpEntity) {
    super(otp);
    this.createdBy = otp.createdBy;
    this.updatedBy = otp.updatedBy;
    this.userId = otp.userId;
    this.code = otp.code;
    this.isStatus = otp.isStatus;
    this.expiredAt = otp.expiredAt;
  }
}
