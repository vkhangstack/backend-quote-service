import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Logger } from 'winston';

import type { ResponseDto } from '../../common/dto/response.dto';
import { RoleType } from '../../constants';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { Auth } from '../../decorators/http.decorators';
import { UserEntity } from '../user/user.entity';
import { CreateLicenseDto } from './dto/create-license.dto';
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
  ): Promise<ResponseDto<LicenseEntity> | ResponseDto<string[]>> {
    try {
      this.loggerService.info('LicenseController execute func activeLicenseToken');
      this.loggerService.debug('LicenseController execute func activeLicenseToken get user', user);
      await this.licenseService.updateLicense(updateLicense, user);

      return {
        code: HttpStatus.OK,
        data: [],
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

  @Get()
  findAll() {
    return this.licenseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.licenseService.findOne(Number(id));
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
