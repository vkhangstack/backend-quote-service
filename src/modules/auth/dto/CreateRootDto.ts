import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString, MinLength, ValidateIf } from 'class-validator';

import { Trim } from '../../../decorators/transform.decorators';

export class CreateRootDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly key: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly email: string;

  @ApiProperty({ minLength: 6 })
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiProperty()
  @ValidateIf((o) => 'phone' in o)
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}
