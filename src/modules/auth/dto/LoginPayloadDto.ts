import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from '../../user/user.entity';
import { TokenPayloadDto } from './TokenPayloadDto';

export class LoginPayloadDto {
  @ApiProperty({ type: UserEntity })
  userInfo?: UserEntity;

  @ApiProperty({ type: TokenPayloadDto })
  auth?: TokenPayloadDto;

  constructor(user: UserEntity, token: TokenPayloadDto) {
    this.userInfo = user;
    this.auth = token;
  }
}
