import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString, ValidateIf } from 'class-validator';

export class UserLoginDto {
  @ApiProperty()
  @ValidateIf((o) => 'username' in o)
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsString()
  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  @ValidateIf((o) => 'email' in o)
  @IsString()
  @IsEmail()
  readonly email?: string;

  @ApiProperty()
  @ValidateIf((o) => 'phoneNumber' in o)
  @IsString()
  @IsPhoneNumber()
  readonly phoneNumber?: string;
}
