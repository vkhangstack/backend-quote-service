import { Injectable } from '@nestjs/common';

import type { CreateLicenseDto } from './dto/create-license.dto';
import type { UpdateLicenseDto } from './dto/update-license.dto';

@Injectable()
export class LicenseService {
  create(createLicenseDto: CreateLicenseDto) {
    return ['This action adds a new license ', createLicenseDto];
  }

  findAll() {
    return 'This action returns all license';
  }

  findOne(id: number) {
    return `This action returns a #${id} license`;
  }

  update(id: number, updateLicenseDto: UpdateLicenseDto) {
    return `This action updates a #${id} license ${updateLicenseDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} license`;
  }
}
