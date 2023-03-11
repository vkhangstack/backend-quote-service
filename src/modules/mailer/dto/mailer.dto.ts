import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import type { Headers } from 'nodemailer/lib/mailer';

export interface IMailer {
  from: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
  headers?: Headers;
}

export class CheckMailDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly toEmail: string;
}
