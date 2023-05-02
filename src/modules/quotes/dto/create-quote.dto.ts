import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';

export class CreateQuoteDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  language: string;

  @ApiPropertyOptional()
  @ValidateIf((o) => 'tags' in o)
  tags: string[];
}
