import { Column, Entity } from 'typeorm';

import type { IAbstractEntity } from '../../../common/abstract.entity';
import { AbstractEntity } from '../../../common/abstract.entity';
import { UseDto } from '../../../decorators/use-dto.decorator';
import { QuoteDto } from '../dto/quote.dto';

export interface IQuoteEntity extends IAbstractEntity<QuoteDto> {
  content: string;

  author: string;

  tags?: string;

  length?: string;
}

@Entity({ name: 'quotes' })
@UseDto(QuoteDto)
export class QuoteEntity extends AbstractEntity<QuoteDto> implements IQuoteEntity {
  @Column({ nullable: false })
  content: string;

  @Column({ nullable: false })
  author: string;

  @Column({ nullable: true })
  tags?: string;

  @Column({ nullable: true })
  length?: string;
}
