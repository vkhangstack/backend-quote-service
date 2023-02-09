import { ApiProperty } from '@nestjs/swagger';

import { UserDto } from '../../user/dtos/user.dto';
import { TokenPayloadDto } from './TokenPayloadDto';

export class LoginPayloadDto {
  @ApiProperty({ type: UserDto })
  userInfo?: UserDto;

  @ApiProperty({ type: TokenPayloadDto })
  auth: TokenPayloadDto;

  constructor(user: UserDto, token: TokenPayloadDto) {
    this.userInfo = user;
    this.auth = token;
  }
}
