import { Injectable } from '@nestjs/common';
import { InjectMailer, Mailer } from 'nestjs-mailer';
import type { Headers } from 'nodemailer/lib/mailer';

import { ApiConfigService } from '../../shared/services/api-config.service';
import type { IMailer } from './dto/mailer.dto';

@Injectable()
export class MailerService {
  constructor(@InjectMailer() private readonly mailer: Mailer, private readonly configService: ApiConfigService) {}

  async checkServiceMailer(to: string, subject: string, text: string, html?: string, headers?: Headers) {
    return this.mailer?.sendMail({
      from: this.configService.mailerConfig.config.transport.defaults.from,
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
