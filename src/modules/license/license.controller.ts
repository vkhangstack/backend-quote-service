import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Logger } from 'winston';

import type { ResponseDto } from '../../common/dto/response.dto';
import { RoleType } from '../../constants';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { Auth } from '../../decorators/http.decorators';
import { UserEntity } from '../user/user.entity';
import { CreateLicenseDto } from './dto/create-license.dto';
import { SearchLicenseDto } from './dto/search-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';
import type { LicenseEntity } from './entities/license.entity';
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
    description: 'Create license',
  })
  @Auth([RoleType.USER, RoleType.ADMIN, RoleType.ROOT])
  async create(
    @Body() createLicenseDto: CreateLicenseDto,
    @AuthUser() user: UserEntity,
  ): Promise<ResponseDto<CreateLicenseDto> | ResponseDto<string[]>> {
    try {
      this.loggerService.info('License controller execute func create');
      const data = await this.licenseService.create(createLicenseDto, user);

      return {
        code: HttpStatus.OK,
        data,
        message: 'Create license successful!',
      };
    } catch (error) {
      this.loggerService.error(`License controller func create error ${error}`);

      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
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
  @Auth([RoleType.USER, RoleType.ADMIN, RoleType.ROOT])
  async activeLicenseToken(
    @Body() updateLicense: UpdateLicenseDto,
    @AuthUser() user: UserEntity,
  ): Promise<ResponseDto<LicenseEntity> | ResponseDto<Record<K, V>>> {
    try {
      this.loggerService.info('LicenseController execute func activeLicenseToken');
      this.loggerService.debug('LicenseController execute func activeLicenseToken get user', user);
      const data = await this.licenseService.updateLicense(updateLicense, user);

      if (data === HttpStatus.CONFLICT) {
        return {
          code: HttpStatus.CONFLICT,
          data: [],
          message: 'License is active',
        };
      }

      return {
        code: HttpStatus.OK,
        data,
        message: 'Active license successful',
      };
    } catch (error) {
      this.loggerService.error(`License controller func activeLicenseToken error ${error}`);

      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: [],
        message: 'Server error unknown',
      };
    }
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UpdateLicenseDto,
    description: 'Get all license token',
  })
  @Auth([RoleType.ADMIN, RoleType.ROOT])
  async findAll(@Body() searchLicenseDto: SearchLicenseDto): Promise<ResponseDto<Record<K, V>>> {
    try {
      this.loggerService.info('LicenseController execute func findAll');
      this.loggerService.debug('LicenseController execute func findAll', searchLicenseDto);
      const data = await this.licenseService.findAll(searchLicenseDto);

      return {
        code: HttpStatus.OK,
        data: {
          list: data,
          total: data.length,
        },
        message: 'Get all license successful',
      };
    } catch (error) {
      this.loggerService.error(`License controller func findAll error ${error}`);

      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: [],
        message: 'Server error unknown',
      };
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UpdateLicenseDto,
    description: 'Get all license token',
  })
  @Auth([RoleType.ADMIN, RoleType.ROOT])
  async findOne(@Param('id') id: Uuid) {
    try {
      this.loggerService.info('LicenseController execute func findOne');
      this.loggerService.debug('LicenseController execute func findOne receive id :', id);

      const data = await this.licenseService.findOne(id);

      return {
        code: HttpStatus.OK,
        data,
        message: 'Get license successful',
      };
    } catch (error) {
      this.loggerService.error(`License controller func findOne error ${error}`);

      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
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
