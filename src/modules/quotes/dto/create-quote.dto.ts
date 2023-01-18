import { ApiProperty } from '@nestjs/swagger';

export class CreateQuoteDto {
  @ApiProperty()
  content: string;
}
