import { Injectable } from '@nestjs/common';

import type { CreateQuoteDto } from './dto/create-quote.dto';
import type { UpdateQuoteDto } from './dto/update-quote.dto';

@Injectable()
export class QuotesService {
  create(_createQuoteDto: CreateQuoteDto) {
    return 'This action adds a new quote';
  }

  findAll() {
    return [];
  }

  findOne(id: number) {
    return `This action returns a #${id} quote`;
  }

  update(id: number, _updateQuoteDto: UpdateQuoteDto) {
    return `This action updates a #${id} quote`;
  }

  remove(id: number) {
    return `This action removes a #${id} quote`;
  }
}
