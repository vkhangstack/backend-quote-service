import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty()
  code?: string;

  @ApiProperty()
  data?: T;

  @ApiProperty()
  message?: string;

  constructor(code: string, data: T, message: string) {
    this.code = code;
    this.data = data;
    this.message = message;
  }
}
