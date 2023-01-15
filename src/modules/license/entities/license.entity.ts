import { Entity } from 'typeorm';

import type { IAbstractEntity } from '../../../common/abstract.entity';
import { AbstractEntity } from '../../../common/abstract.entity';
import { UseDto } from '../../../decorators/use-dto.decorator';
import { CreateLicenseDto } from '../dto/create-license.dto';

export type ILicenseEntity = IAbstractEntity<CreateLicenseDto>;

@Entity({ name: 'license' })
@UseDto(CreateLicenseDto)
export class LicenseEntity extends AbstractEntity implements ILicenseEntity {}
