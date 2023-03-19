import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: Uuid;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(6)
  code: string;
}
