import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Logger } from 'winston';

import type { ResponseDto } from '../../common/dto/response.dto';
import { RoleType } from '../../constants';
import { MessageServerCode, ServerCode } from '../../constants/system.enum';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { Auth } from '../../decorators/http.decorators';
import { UserEntity } from '../user/user.entity';
import { CreateTypeLicenseDto } from './dto/create-type-license.dto';
import { SearchLicenseDto } from './dto/search-license.dto';
import { TypeLicenseDto } from './dto/type-license.dtos';
import { UpdateTypeLicenseDto } from './dto/update-license.dto';
import type { TypeLicenseEntity } from './entities/type-license.entity';
import { CODE, MASSAGE } from './type-license.enum';
// import type { TypeLicenseEntity } from './entities/type-license.entity';
import { TypeLicenseService } from './type-license.service';

@Controller('typeLicense')
@ApiTags('type_license')
export class LicenseController {
  constructor(
    private readonly typeLicenseService: TypeLicenseService,

    @Inject('winston')
    private loggerService: Logger,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: CreateTypeLicenseDto,
    description: 'Create type license by only admin',
  })
  @Auth([RoleType.ADMIN])
  async createTypeLicense(
    @AuthUser() user: UserEntity,
    @Body() createLicenseDto: CreateTypeLicenseDto,
  ): Promise<ResponseDto<CreateTypeLicenseDto> | ResponseDto<any>> {
    try {
      this.loggerService.debug('Type license controller execute func createTypeLicense');
      const data = await this.typeLicenseService.createTypeLicense(createLicenseDto, user);

      return {
        code: CODE.CREATE_SUCCESS,
        data,
        message: MASSAGE.CREATE_SUCCESS,
      };
    } catch (error) {
      this.loggerService.error(`Type license controller func createTypeLicense error ${error}`);

      return {
        code: ServerCode.ERROR,
        data: [],
        message: MessageServerCode.ERROR,
      };
    }
  }

  @Put('/')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UpdateTypeLicenseDto,
    description: 'Update type license',
  })
  @Auth([RoleType.ADMIN])
  async activeLicenseToken(
    @Body() updateTypeLicense: UpdateTypeLicenseDto,
    @AuthUser() user: UserEntity,
  ): Promise<ResponseDto<TypeLicenseEntity> | ResponseDto<any>> {
    try {
      this.loggerService.info('Type license controller execute func activeLicenseToken');
      this.loggerService.debug('LicenseController execute func activeLicenseToken get user', user);
      const id = await this.typeLicenseService.checkLicense(updateTypeLicense.id);

      if (!id) {
        return {
          code: CODE.LICENSE_NOT_FOUND,
          data: [],
          message: MASSAGE.LICENSE_NOT_FOUND,
        };
      }

      const data = await this.typeLicenseService.updateTypeLicense(id, updateTypeLicense, user);

      return {
        code: CODE.UPDATE_SUCCESS,
        data,
        message: MASSAGE.UPDATE_SUCCESS,
      };
    } catch (error) {
      this.loggerService.error(`Type license controller func activeLicenseToken error ${error}`);

      return {
        code: ServerCode.ERROR,
        data: [],
        message: MessageServerCode.ERROR,
      };
    }
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: TypeLicenseDto,
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
      this.loggerService.debug('Type license controller execute func findAll');
      this.loggerService.debug('Type license controller execute func findAll', searchLicenseDto);
      const data = await this.typeLicenseService.findAll(searchLicenseDto);

      return {
        code: CODE.GET_LIST_SUCCESS,
        data,
        message: MASSAGE.GET_LIST_SUCCESS,
      };
    } catch (error) {
      this.loggerService.error(`Type license controller func findAll error ${error}`);

      return {
        code: ServerCode.ERROR,
        data: [],
        message: MessageServerCode.ERROR,
      };
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: TypeLicenseDto,
    description: 'Get type license with id',
  })
  @Auth([RoleType.ADMIN])
  async findOne(@Param('id') id: Uuid): Promise<ResponseDto<any>> {
    try {
      this.loggerService.debug('Type license controller execute func findOne');
      this.loggerService.debug('Type license controller execute func findOne receive id :', id);
      const result = await this.typeLicenseService.findOne(id);
      const data = result === undefined ? [] : result;

      return {
        code: CODE.GET_DETAIL_SUCCESS,
        data,
        message: MASSAGE.GET_DETAIL_SUCCESS,
      };
    } catch (error) {
      this.loggerService.error(`Type license controller func findOne error ${error}`);

      return {
        code: ServerCode.ERROR,
        data: [],
        message: MessageServerCode.ERROR,
      };
    }
  }

  //   @Patch(':id')
  //   update(@Param('id') id: string, @Body() updateLicenseDto: UpdateLicenseDto) {
  //     return this.licenseService.update(Number(id), updateLicenseDto);
  //   }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.licenseService.remove(Number(id));
  //   }
}
