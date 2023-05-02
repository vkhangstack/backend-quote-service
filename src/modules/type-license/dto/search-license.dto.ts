import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString, ValidateIf } from 'class-validator';

export class SearchLicenseDto {
  @ApiPropertyOptional({
    type: Number,
  })
  @ValidateIf((o) => 'status' in o)
  @IsNumber()
  readonly status: number;

  @ApiPropertyOptional({
    type: String,
  })
  @ValidateIf((o) => 'order' in o)
  @IsString()
  readonly order: string;

  @ApiPropertyOptional({
    type: String,
  })
  @ValidateIf((o) => 'sort' in o)
  @IsString()
  readonly sort: string;

  @ApiPropertyOptional({
    type: String,
  })
  @ValidateIf((o) => 'filter' in o)
  @IsString()
  readonly filter: string;

  @ApiPropertyOptional({
    type: String,
  })
  @ValidateIf((o) => 'filterValue' in o)
  @IsString()
  readonly filterValue: string;

  @ApiPropertyOptional({
    type: Number,
  })
  @ValidateIf((o) => 'limit' in o)
  @IsString()
  readonly limit: string;
}
