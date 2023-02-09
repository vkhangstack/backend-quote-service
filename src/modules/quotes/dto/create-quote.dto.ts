import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

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
  @ValidateIf((o) => 'tags' in o)
  tags: string[];
}
