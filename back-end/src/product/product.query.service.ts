import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductQueryService {
  constructor(private readonly prisma: PrismaService) {}

  async getProducts(
    page: number = 1,
    limit: number = 16,
    sortBy: 'name' | 'discount' | 'price' = 'price',
    order: 'asc' | 'desc' = 'asc',
    categoryId?: string,
  ) {
    const totalProductsInCategory = await this.prisma.productDetails.count({
      where: categoryId ? { categoryId } : undefined,
    });

    const productDetails = await this.prisma.productDetails.findMany({
      where: categoryId ? { categoryId } : undefined,
      take: limit,
      skip: (page - 1) * limit,
    });

    const skus = productDetails.map((detail) => detail.sku);

    const products = await this.prisma.product.findMany({
      where: { sku: { in: skus } },
      orderBy: { [sortBy]: order },
    });

    if (products.length === 0 && page > 1) {
      return this.getProducts(1, limit, sortBy, order, categoryId);
    }

    return {
      products,
      totalProducts: totalProductsInCategory,
    };
  }

  getProductDetails(sku: string) {
    return this.prisma.productDetails.findUnique({
      where: { sku: sku },
      include: { tags: true, category: true },
    });
  }

  async getProductsByCategory(categoryId: string) {
    const productDetails = await this.prisma.productDetails.findMany({
      where: { categoryId },
      take: 4,
    });

    if (productDetails.length === 0) return [];
    const skus = productDetails.map((product) => product.sku);

    const products = await this.prisma.product.findMany({
      where: { sku: { in: skus } },
    });

    return products;
  }

  async getProductsByTags(tags: string[], skip: number = 0) {
    const productsDetails = await this.prisma.productDetails.findMany({
      where: {
        tags: { some: { name: { in: tags } } },
      },
      include: { product: true },
      take: 4,
      skip,
    });

    return productsDetails.map((product) => product.product);
  }
}
