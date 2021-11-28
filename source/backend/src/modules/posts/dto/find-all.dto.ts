import { ApiProperty } from '@nestjs/swagger';

export class FindAllQuery {
  @ApiProperty({
  type: String,
  required: false,
})
  page?: string;
}
