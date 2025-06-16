import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsArray,
  IsNotEmpty,
  IsPositive,
  IsNumber,
} from 'class-validator';

export class ProductDto {
  @ApiProperty({
    description: 'The image of the product',
    example: 'https://via.placeholder.com/150',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    description: 'The name of the product',
    example: 'iPhone 12',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The title of the product',
    example: 'Apple iPhone 12',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 799,
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'The discount of the product',
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  discount?: number;

  @ApiProperty({
    description: 'The description of the product',
    example: 'A smartphone from Apple',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiProperty({
    description: 'The category name of the product',
    example: 'Electronics',
  })
  @IsString()
  categoryName: string;

  @ApiProperty({
    description: 'The tags of the product',
    example: ['smartphone', 'apple', 'iphone'],
  })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiProperty({
    description: 'The color of the product',
    example: 'black',
  })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({
    description: 'The size of the product',
    example: 'M',
  })
  @IsOptional()
  @IsString()
  size?: string;
}
