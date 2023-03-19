import { Column, Entity } from 'typeorm';

import type { IAbstractEntity } from '../../../common/abstract.entity';
import { AbstractEntity } from '../../../common/abstract.entity';
import { UseDto } from '../../../decorators/use-dto.decorator';
import { LicenseDto } from '../dto/license.dto';

export interface ILicenseEntity extends IAbstractEntity<LicenseDto> {
  userId: string;

  typeLicenseId: string;

  dayExpire: number;

  expires: number;

  status: number;

  licenseKey: string;

  licenseToken: string;

  createdBy: string;

  updatedBy?: string;
}

@Entity({ name: 'licenses' })
@UseDto(LicenseDto)
export class LicenseEntity extends AbstractEntity<LicenseDto> implements ILicenseEntity {
  @Column({ nullable: false })
  userId: string;

  @Column()
  expires: number;

  @Column()
  dayExpire: number;

  @Column()
  typeLicenseId: string;

  @Column()
  status: number;

  @Column()
  licenseKey: string;

  @Column()
  licenseToken: string;

  @Column()
  createdBy: string;

  @Column({ nullable: true })
  updatedBy?: string;
}
