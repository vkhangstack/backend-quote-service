import { EntityRepository, Repository } from 'typeorm';

import { QuoteEntity } from './entities/quote.entity';

@EntityRepository(QuoteEntity)
export class QuoteRepository extends Repository<QuoteEntity> {}
