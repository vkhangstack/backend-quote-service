import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateLicenseDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  readonly licenseId: string;
}
