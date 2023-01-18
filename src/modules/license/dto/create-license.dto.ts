import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLicenseDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  dayExpire: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  typeLicense: number;
}
