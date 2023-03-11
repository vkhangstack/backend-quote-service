import { Body, Controller, Post } from '@nestjs/common';

import { CheckMailDto } from './dto/mailer.dto';
import { CODE } from './enum';
import { MailerService } from './mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private mailerService: MailerService) {}

  @Post('/check')
  async getHello(@Body() mailDto: CheckMailDto) {
    const send = await this.mailerService.sendMailerService(
      mailDto.toEmail,
      `Send message to ${mailDto.toEmail} to check system status`,
      `Hello ${mailDto.toEmail}`,
      '👌',
    );

    return {
      code: CODE.EMAIL_SUCCESS,
      data: {
        mailId: send?.messageId,
      },
      message: 'Send message to ' + mailDto.toEmail + ' to check system status',
    };
  }
}
