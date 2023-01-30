import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class GetQuoteDto {
  @ApiPropertyOptional()
  @ValidateIf((o) => 'licenseKey' in o)
  @IsNotEmpty()
  @IsString()
  licenseKey: string;
}
