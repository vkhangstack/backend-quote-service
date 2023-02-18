import { Injectable } from '@nestjs/common';
import { InjectMailer, Mailer } from 'nestjs-mailer';
import type { Headers } from 'nodemailer/lib/mailer';

import type { IMailer } from './dto/mailer.dto';

@Injectable()
export class MailerService {
  constructor(@InjectMailer() private readonly mailer: Mailer) {}

  async checkServiceMailer(from: string, to: string, subject: string, text: string, html?: string, headers?: Headers) {
    return this.mailer?.sendMail({
      from,
      to,
      subject,
      text,
      html,
      headers,
    });
  }

  async sendMail(options: IMailer) {
    return this.mailer?.sendMail(options);
  }
}
