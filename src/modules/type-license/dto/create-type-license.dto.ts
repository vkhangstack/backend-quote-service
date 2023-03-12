import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTypeLicenseDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  typeLicense: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  priceMonth: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  priceYear: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  priceDiscount: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  priceDiscountMonth: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  priceDiscountYear: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  discount: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  discountMonth: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  discountYear: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  limitMonth: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  limitDay: number;
}
