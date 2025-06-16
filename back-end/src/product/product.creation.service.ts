import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductDto } from './product.dto';

@Injectable()
export class ProductCreationService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(
    productDto: ProductDto,
    category: { id: string },
    sku: string,
    tags?: { name: string }[] | undefined,
  ) {
    const { name, image, title, price, discount, description } = productDto;

    try {
      const product = await this.prisma.product.create({
        data: { sku, name, image, title, price, discount },
      });

      await this.prisma.productDetails.create({
        data: {
          description,
          sku: product.sku,
          categoryId: category.id,
          tags: { connect: tags },
        },
      });

      return product;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        `Error creating product: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
