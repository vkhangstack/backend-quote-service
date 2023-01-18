import { HttpStatus } from '@nestjs/common';

export function ResponseException() {
  return {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    data: [],
    message: 'Server error unknown',
  };
}
