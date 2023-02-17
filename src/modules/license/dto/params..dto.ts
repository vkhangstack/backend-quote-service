import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { AbstractDto } from '../../../common/dto/abstract.dto';

export class ParamsDto extends AbstractDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  orderBy?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  valueOrderBy?: string;
}
