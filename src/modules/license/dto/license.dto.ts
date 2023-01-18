import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { AbstractDto } from '../../../common/dto/abstract.dto';

export class LicenseDto extends AbstractDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  userId?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  expires?: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  dayExpire?: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  typeLicense?: number;
}
