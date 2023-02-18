import { Column, Entity } from 'typeorm';

import type { IAbstractEntity } from '../../common/abstract.entity';
import { AbstractEntity } from '../../common/abstract.entity';
import type { OtpDto } from './dtos/otp.dto';

export interface IOtpEntity extends IAbstractEntity<OtpDto> {
  createdBy?: string;
  updatedBy?: string;
  userId: Uuid;
  code: string;
  isStatus: number;
}

@Entity({ name: 'otp_codes' })
export class OtpEntity extends AbstractEntity<OtpDto> implements IOtpEntity {
  @Column()
  createdBy: string;

  @Column()
  updatedBy?: string;

  @Column({ nullable: false })
  userId: Uuid;

  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false })
  isStatus: number;
}
