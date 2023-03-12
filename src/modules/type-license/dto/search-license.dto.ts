import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, ValidateIf } from 'class-validator';

export class SearchLicenseDto {
  @ApiPropertyOptional({
    type: Number,
  })
  @ValidateIf((o) => 'status' in o)
  @IsNumber()
  readonly status?: number;
}
