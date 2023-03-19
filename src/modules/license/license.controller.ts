import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Logger } from 'winston';

import type { ResponseDto } from '../../common/dto/response.dto';
import { RoleType } from '../../constants';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { Auth } from '../../decorators/http.decorators';
import { UserEntity } from '../user/user.entity';
import { CreateLicenseDto } from './dto/create-license.dto';
import { LicenseDto } from './dto/license.dto';
import { SearchLicenseDto } from './dto/search-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';
import type { LicenseEntity } from './entities/license.entity';
import { CODE, MESSAGE } from './license.enum';
import { LicenseService } from './license.service';

@Controller('license')
@ApiTags('license')
export class LicenseController {
  constructor(
    private readonly licenseService: LicenseService,

    @Inject('winston')
    private loggerService: Logger,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: CreateLicenseDto,
    description: 'Create license by user or admin',
  })
  @Auth([RoleType.USER, RoleType.ADMIN])
  async create(
    @Body() createLicenseDto: CreateLicenseDto,
    @AuthUser() user: UserEntity,
  ): Promise<ResponseDto<LicenseEntity> | ResponseDto<string[]>> {
    try {
      this.loggerService.info('License controller execute func create');
      const data = await this.licenseService.create(createLicenseDto, user);

      return {
        code: CODE.CREATE_SUCCESS,
        data,
        message: MESSAGE.CREATE_SUCCESS,
      };
    } catch (error) {
      this.loggerService.error(`License controller func create error ${error}`);

      return {
        code: '4000',
        data: [],
        message: 'Server error unknown',
      };
    }
  }

  @Put('/active')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UpdateLicenseDto,
    description: 'Active license token',
  })
  @Auth([RoleType.ADMIN])
  async activeLicenseToken(
    @Body() updateLicense: UpdateLicenseDto,
    @AuthUser() user: UserEntity,
  ): Promise<ResponseDto<LicenseEntity> | ResponseDto<any>> {
    try {
      this.loggerService.info('LicenseController execute func activeLicenseToken');
      this.loggerService.debug('LicenseController execute func activeLicenseToken get user', user);
      const data = await this.licenseService.updateLicense(updateLicense, user);

      if (data === HttpStatus.CONFLICT) {
        return {
          code: '4004',
          data: [],
          message: 'License is active',
        };
      }

      return {
        code: '2000',
        data,
        message: 'Active license successful',
      };
    } catch (error) {
      this.loggerService.error(`License controller func activeLicenseToken error ${error}`);

      return {
        code: '5000',
        data: [],
        message: 'Server error unknown',
      };
    }
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LicenseDto,
    description: 'Get all license token',
  })
  @ApiBody({
    required: false,
    type: SearchLicenseDto,
    enum: [1, 2],
  })
  @Auth([RoleType.ADMIN])
  async findAll(@Body() searchLicenseDto: SearchLicenseDto): Promise<ResponseDto<any>> {
    try {
      this.loggerService.info('LicenseController execute func findAll');
      this.loggerService.debug('LicenseController execute func findAll', searchLicenseDto);
      const data = await this.licenseService.findAll(searchLicenseDto);

      return {
        code: '2000',
        data,
        message: 'Get all license successful',
      };
    } catch (error) {
      this.loggerService.error(`License controller func findAll error ${error}`);

      return {
        code: '5000',
        data: [],
        message: 'Server error unknown',
      };
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LicenseDto,
    description: 'Get license with licenseId',
  })
  @Auth([RoleType.ADMIN])
  async findOne(@Param('id') id: Uuid): Promise<ResponseDto<any>> {
    try {
      this.loggerService.info('LicenseController execute func findOne');
      this.loggerService.debug('LicenseController execute func findOne receive id :', id);
      const result = await this.licenseService.findOne(id);
      const data = result === undefined ? [] : result;

      return {
        code: '2000',
        data,
        message: 'Get license successful',
      };
    } catch (error) {
      this.loggerService.error(`License controller func findOne error ${error}`);

      return {
        code: '2000',
        data: [],
        message: 'Server error unknown',
      };
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLicenseDto: UpdateLicenseDto) {
    return this.licenseService.update(Number(id), updateLicenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.licenseService.remove(Number(id));
  }
}
