import type { Headers } from 'nodemailer/lib/mailer';

export interface IMailer {
  from: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
  headers?: Headers;
}
