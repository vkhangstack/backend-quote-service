import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';
import { LicenseService } from './license.service';

@Controller('license')
export class LicenseController {
  constructor(private readonly licenseService: LicenseService) {}

  @Post()
  create(@Body() createLicenseDto: CreateLicenseDto) {
    return this.licenseService.create(createLicenseDto);
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
