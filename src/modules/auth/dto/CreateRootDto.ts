import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength, ValidateIf } from 'class-validator';

import { Trim } from '../../../decorators/transform.decorators';

export class CreateRootDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly key: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly username: string;

  @ApiProperty({ required: true })
  @IsEmail()
  @IsNotEmpty()
  @Trim()
  readonly email: string;

  @ApiProperty({ minLength: 6 })
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiProperty({ minLength: 10 })
  @ValidateIf((o) => 'phone' in o)
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}
