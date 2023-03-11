import { Module } from '@nestjs/common';
import { MailerModule as MailNestModule } from 'nestjs-mailer';

import { ApiConfigService } from '../../shared/services/api-config.service';
import { SharedModule } from '../../shared/shared.module';
import { MailerController } from './mailer.controller';
import { MailerService } from './mailer.service';

@Module({
  imports: [
    MailNestModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => configService.mailerConfig,
      inject: [ApiConfigService],
    }),
  ],
  providers: [MailerService],
  controllers: [MailerController],
})
export class MailerModule {}
