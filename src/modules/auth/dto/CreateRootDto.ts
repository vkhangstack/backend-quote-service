import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

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
  readonly email: string;

  @ApiProperty({ minLength: 6 })
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiProperty()
  phone: string;
}
