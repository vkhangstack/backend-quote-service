import { HttpStatus, NotFoundException } from '@nestjs/common';

export class UserWrongPassword extends NotFoundException {
  constructor() {
    super({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      data: [],
      message: 'Wrong password',
    });
  }
}
