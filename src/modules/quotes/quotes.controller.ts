import {
  All,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Logger } from 'winston';

import { RoleType } from '../../constants';
import { ApiFile, AuthUser } from '../../decorators';
import { Auth } from '../../decorators/http.decorators';
import { IFile } from '../../interfaces/IFile';
import { LicenseService } from '../license/license.service';
import { UserEntity } from '../user/user.entity';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { GetQuoteDto } from './dto/get-quote.dto';
import { QuoteDto } from './dto/quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { CODE, MESSAGE, StatusLicense } from './quote.enum';
import { QuotesService } from './quotes.service';

@ApiTags('quotes')
@Controller('quotes')
export class QuotesController {
  constructor(
    private readonly quotesService: QuotesService,
    private readonly licenseService: LicenseService,

    @Inject('winston')
    private readonly loggerService: Logger,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: QuoteDto,
    description: 'Create quotes',
  })
  @Auth([RoleType.ADMIN])
  async create(@AuthUser() user: UserEntity, @Body() createQuoteDto: CreateQuoteDto): Promise<object> {
    try {
      this.loggerService.info('Quotes controller execute func create');
      this.loggerService.debug('Quotes controller execute func create receive body', createQuoteDto);

      const data = await this.quotesService.create(user, createQuoteDto);

      return {
        code: CODE.CREATE_QUOTES_SUCCESS,
        data,
        message: MESSAGE.CREATE_QUOTES_SUCCESS,
      };
    } catch (error) {
      this.loggerService.error(`Quotes controller func create error ${error}`);

      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: [],
        message: 'Server error unknown',
      };
    }
  }

  @Post('/file')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: QuoteDto,
    description: 'Create quotes from import file',
  })
  @ApiFile({ name: 'file' })
  @Auth([RoleType.ADMIN])
  createImport(@UploadedFile() file: IFile) {
    try {
      this.loggerService.info('Quotes controller execute func createImport');
      this.loggerService.debug('Quotes controller execute func createImport receive file', file);

      const data = this.quotesService.createImport(file);

      return {
        code: CODE.CREATE_QUOTES_SUCCESS,
        data,
        message: MESSAGE.CREATE_QUOTES_SUCCESS,
      };
    } catch (error) {
      this.loggerService.error(`Quotes controller func createImport error ${error}`);

      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: [],
        message: 'Server error unknown',
      };
    }
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: QuoteDto,
    description: 'get all quotes',
  })
  @Auth([RoleType.ADMIN])
  @Get()
  findAll(): string {
    return this.quotesService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: QuoteDto,
    description: 'Get random quote',
  })
  @All('/random')
  async randomQuote(@Query('licenseKey') licenseKey: string, @Body() getQuoteDto: GetQuoteDto): Promise<any> {
    try {
      this.loggerService.info('Quotes controller execute func randomQuote');
      this.loggerService.debug('QuoteController execute func randomQuote get license key from query', licenseKey);
      this.loggerService.debug('QuotesController execute func randomQuote get license key from body', getQuoteDto);
      licenseKey = licenseKey ? licenseKey : getQuoteDto.licenseKey;
      const license = await this.licenseService.checkLicenseKey(licenseKey);

      if (license === StatusLicense.EXPIRED) {
        this.loggerService.debug(`QuotesController execute func randomQuote but license ${licenseKey} is expired`);

        return {
          code: HttpStatus.OK,
          data: [],
          message: 'License key expired',
        };
      }

      if (license === StatusLicense.NOT_FOUND) {
        this.loggerService.debug('QuotesController execute func randomQuote but license not found');

        return {
          code: HttpStatus.OK,
          data: [],
          message: 'License key not found!',
        };
      }

      const data = await this.quotesService.randomQuote();

      return {
        code: CODE.RANDOM_SUCCESS,
        data,
        message: MESSAGE.RANDOM_SUCCESS,
      };
    } catch (error) {
      this.loggerService.error(`Quotes controller func create error ${error}`);

      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: [],
        message: 'Server error unknown',
      };
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuoteDto: UpdateQuoteDto) {
    return this.quotesService.update(Number(id), updateQuoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quotesService.remove(Number(id));
  }
}
