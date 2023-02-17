import { ApiProperty } from '@nestjs/swagger';

export class TokenPayloadDto {
  @ApiProperty()
  expiresIn: number;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshExpireAt: number;

  constructor(data: { expiresIn: number; accessToken: string; refreshExpireAt: number }) {
    this.accessToken = data.accessToken;
    this.expiresIn = data.expiresIn;
    this.refreshExpireAt = data.refreshExpireAt;
  }
}
