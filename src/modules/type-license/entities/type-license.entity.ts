import { Column, Entity } from 'typeorm';

import type { IAbstractEntity } from '../../../common/abstract.entity';
import { AbstractEntity } from '../../../common/abstract.entity';
import { UseDto } from '../../../decorators/use-dto.decorator';
import { TypeLicenseDto } from '../dto/type-license.dtos';

export interface ITypeLicenseEntity extends IAbstractEntity<TypeLicenseDto> {
  typeLicense: string;

  name: string;

  price: number;

  priceMonth: number;

  priceYear: number;

  priceDiscount: number;

  priceDiscountMonth: number;

  priceDiscountYear: number;

  discount: number;

  discountMonth: number;

  discountYear: number;

  limitMonth: number;

  limitDay: number;

  status: number;

  createdBy: string;

  updatedBy?: string;
}

@Entity({ name: 'type_license' })
@UseDto(TypeLicenseDto)
export class TypeLicenseEntity extends AbstractEntity<TypeLicenseDto> implements ITypeLicenseEntity {
  @Column({ nullable: false })
  typeLicense: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  priceMonth: number;

  @Column({ nullable: false })
  priceYear: number;

  @Column({ nullable: false })
  priceDiscount: number;

  @Column({ nullable: false })
  priceDiscountMonth: number;

  @Column({ nullable: false })
  priceDiscountYear: number;

  @Column({ nullable: false })
  discount: number;

  @Column({ nullable: false })
  discountMonth: number;

  @Column({ nullable: false })
  discountYear: number;

  @Column({ nullable: false })
  limitMonth: number;

  @Column({ nullable: false })
  limitDay: number;

  @Column({ nullable: false })
  status: number;

  @Column({ nullable: false })
  createdBy: string;

  @Column({ nullable: true })
  updatedBy?: string;
}
