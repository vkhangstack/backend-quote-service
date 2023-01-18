import { EntityRepository, Repository } from 'typeorm';

import { LicenseEntity } from './entities/license.entity';

@EntityRepository(LicenseEntity)
export class LicenseRepository extends Repository<LicenseEntity> {}
