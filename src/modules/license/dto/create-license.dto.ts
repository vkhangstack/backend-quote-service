import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLicenseDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  dayExpire: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  typeLicenseId: string;
}
