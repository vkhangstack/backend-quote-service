import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString, ValidateIf } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({ required: false })
  @ValidateIf((o) => 'username' in o)
  @IsString()
  readonly username: string;

  @ApiProperty({ required: true })
  @IsString()
  @ApiProperty()
  readonly password: string;

  @ApiProperty({ required: false })
  @ValidateIf((o) => 'email' in o)
  @IsString()
  @IsEmail()
  readonly email?: string;

  @ApiProperty({ required: false })
  @ValidateIf((o) => 'phoneNumber' in o)
  @IsString()
  @IsPhoneNumber()
  readonly phoneNumber?: string;
}
