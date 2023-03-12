import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import { UserEntity } from '../user/user.entity';
import { CreateTypeLicenseDto } from './dto/create-type-license.dto';
import type { SearchLicenseDto } from './dto/search-license.dto';
import { UpdateTypeLicenseDto } from './dto/update-license.dto';
import type { TypeLicenseEntity } from './entities/type-license.entity';
import { STATUS } from './type-license.enum';
import { TypeLicenseRepository } from './type-license.repository';

@Injectable()
export class TypeLicenseService {
  constructor(private typeLicenseRepository: TypeLicenseRepository) {}

  @Transactional()
  async createTypeLicense(createLicenseDto: CreateTypeLicenseDto, user: UserEntity): Promise<TypeLicenseEntity> {
    const model = this.typeLicenseRepository.create({
      ...createLicenseDto,
      status: STATUS.ACTIVE,
      createdBy: user.username,
    });
    await this.typeLicenseRepository.save(model);

    return model;
  }

  @Transactional()
  async updateTypeLicense(updateLicenseDto: UpdateTypeLicenseDto, user: UserEntity): Promise<any> {
    const id = await this.typeLicenseRepository.findOne({ where: { id: updateLicenseDto.id } });

    return this.typeLicenseRepository.save({
      ...id,
      ...updateLicenseDto,
      updatedBy: user.username,
      updatedAt: new Date(),
    });
  }

  async findAll(searchLicenseDto: SearchLicenseDto): Promise<{ typeLicenses: TypeLicenseEntity[]; total: number }> {
    if (!searchLicenseDto.status) {
      const data = await this.typeLicenseRepository.find();

      return {
        typeLicenses: data,
        total: data.length,
      };
    }

    const data = await this.typeLicenseRepository.find({ status: searchLicenseDto.status });

    return {
      typeLicenses: data,
      total: data.length,
    };
  }

  findOne(id: Uuid) {
    return this.typeLicenseRepository.findOne({ id });
  }
}
