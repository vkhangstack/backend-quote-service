import { Injectable } from '@nestjs/common';

import type { CreateQuoteDto } from './dto/create-quote.dto';
import type { UpdateQuoteDto } from './dto/update-quote.dto';
import { QuoteRepository } from './quote.repository';

@Injectable()
export class QuotesService {
  constructor(private quoteRepository: QuoteRepository) {}

  async create(createQuoteDto: CreateQuoteDto): Promise<any> {
    const model = this.quoteRepository.create({
      ...createQuoteDto,
      tags: createQuoteDto.tags.toString(),
      length: createQuoteDto.content.length.toString(),
    });

    const data = await this.quoteRepository.save(model);

    const result = {
      ...data,
      tags: createQuoteDto.tags,
    };

    return result;
  }

  findAll() {
    return 'This action returns all quotes';
  }

  async randomQuote() {
    const record = await this.findOne();
    const data = record[Math.floor(Math.random() * record.length)];

    return data;
  }

  async findOne() {
    return this.quoteRepository.find();
  }

  update(id: number, updateQuoteDto: UpdateQuoteDto) {
    return `This action updates a #${id} quote and ${updateQuoteDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} quote`;
  }
}
