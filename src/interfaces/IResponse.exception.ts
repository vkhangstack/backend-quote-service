import type { HttpStatus } from '@nestjs/common';

export interface IResponseException {
  code: HttpStatus.INTERNAL_SERVER_ERROR;
  data: [];
  message: 'Server error unknown';
}
