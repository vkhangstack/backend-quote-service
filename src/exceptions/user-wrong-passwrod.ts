import { NotFoundException } from '@nestjs/common';

import { AuthEnum, MessageAuthEnum } from '../modules/auth/auth.enum';

export class UserWrongPassword extends NotFoundException {
  constructor() {
    super({
      code: AuthEnum.LOGIN_FAILURE,
      data: [],
      message: MessageAuthEnum.LOGIN_FAILURE,
    });
  }
}
