import { EntityRepository, Repository } from 'typeorm';

import { OtpEntity } from './otp.entity';

@EntityRepository(OtpEntity)
export class OtpRepository extends Repository<OtpEntity> {}
