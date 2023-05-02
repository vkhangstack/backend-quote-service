import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class UpdateTypeLicenseDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  id: Uuid;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  typeLicense: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @ValidateIf((o) => 'price' in o)
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiPropertyOptional()
  @ValidateIf((o) => 'priceMonth' in o)
  @IsNotEmpty()
  @IsNumber()
  priceMonth: number;

  @ApiPropertyOptional()
  @ValidateIf((o) => 'priceYear' in o)
  @IsNotEmpty()
  @IsNumber()
  priceYear: number;

  @ApiPropertyOptional()
  @ValidateIf((o) => 'priceDiscount' in o)
  @IsNotEmpty()
  @IsNumber()
  priceDiscount: number;

  @ApiPropertyOptional()
  @ValidateIf((o) => 'priceDiscountMonth' in o)
  @IsNotEmpty()
  @IsNumber()
  priceDiscountMonth: number;

  @ApiPropertyOptional()
  @ValidateIf((o) => 'priceYear' in o)
  @IsNotEmpty()
  @IsNumber()
  priceDiscountYear: number;

  @ApiPropertyOptional()
  @ValidateIf((o) => 'discount' in o)
  @IsNotEmpty()
  @IsNumber()
  discount: number;

  @ApiPropertyOptional()
  @ValidateIf((o) => 'discountMonth' in o)
  @IsNotEmpty()
  @IsNumber()
  discountMonth: number;

  @ApiPropertyOptional()
  @ValidateIf((o) => 'discountYear' in o)
  @IsNotEmpty()
  @IsNumber()
  discountYear: number;

  @ApiPropertyOptional()
  @ValidateIf((o) => 'limitMonth' in o)
  @IsNotEmpty()
  @IsNumber()
  limitMonth: number;

  @ApiPropertyOptional()
  @ValidateIf((o) => 'limitDay' in o)
  @IsNotEmpty()
  @IsNumber()
  limitDay: number;
}
