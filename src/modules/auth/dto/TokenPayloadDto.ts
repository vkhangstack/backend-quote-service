import { ApiProperty } from '@nestjs/swagger';

export class TokenPayloadDto {
  @ApiProperty()
  expiresIn: number;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: number;

  constructor(data: { expiresIn: number; accessToken: string; refreshToken: number }) {
    this.expiresIn = data.expiresIn;
    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
  }
}
