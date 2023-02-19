import { Controller, Post } from '@nestjs/common';

import { MailerService } from './mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private mailerService: MailerService) {}

  @Post('/check')
  async getHello() {
    const send = await this.mailerService.checkServiceMailer(
      'khangdev@yopmail.com',
      'khangdev@example.com',
      'Hello Khang Dev',
      'Hello Khang',
      '<h1>By Pham Van Khang</h1>',
    );

    return send?.messageId;
  }
}