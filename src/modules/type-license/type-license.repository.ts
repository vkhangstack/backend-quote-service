import { EntityRepository, Repository } from 'typeorm';

import { TypeLicenseEntity } from './entities/type-license.entity';

@EntityRepository(TypeLicenseEntity)
export class TypeLicenseRepository extends Repository<TypeLicenseEntity> {}
