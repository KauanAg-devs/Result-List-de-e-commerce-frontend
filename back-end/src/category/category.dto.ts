import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Electronics',
  })
  name: string;
}
