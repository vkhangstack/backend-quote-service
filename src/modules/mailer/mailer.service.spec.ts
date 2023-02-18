import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { MailerService } from './mailer.service';

describe('MailService', () => {
  let service: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailerService],
    }).compile();

    service = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
