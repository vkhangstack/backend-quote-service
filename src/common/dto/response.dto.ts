import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty()
  code?: number;

  @ApiProperty()
  data?: T;

  @ApiProperty()
  message?: string;

  constructor(code: number, data: T, message: string) {
    this.code = code;
    this.data = data;
    this.message = message;
  }
}
