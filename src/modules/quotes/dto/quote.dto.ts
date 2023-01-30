import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { AbstractDto } from '../../../common/dto/abstract.dto';

export class QuoteDto extends AbstractDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  tags?: string[];

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  length?: string;
}
