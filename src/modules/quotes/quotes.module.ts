import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LicenseModule } from '../license/license.module';
import { LicenseRepository } from '../license/license.repository';
import { LicenseService } from '../license/license.service';
import { TypeLicenseRepository } from '../type-license/type-license.repository';
import { QuoteRepository } from './quote.repository';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuoteRepository, LicenseRepository, TypeLicenseRepository]), LicenseModule],
  controllers: [QuotesController],
  providers: [QuotesService, LicenseService],
  exports: [QuotesService],
})
export class QuotesModule {}
