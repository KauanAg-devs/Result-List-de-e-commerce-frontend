import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/prisma.service';
import { SkuService } from 'src/sku/sku.service';
import { CategoryService } from 'src/category/category.service';
import { TagsService } from 'src/tags/tags.service';
import { ProductCreationService } from './product.creation.service';
import { ProductQueryService } from './product.query.service';

const ProductRelatedServices = [ProductCreationService, ProductQueryService];
const productDefinitionsServices = [SkuService, CategoryService, TagsService];
@Module({
  providers: [
    ...ProductRelatedServices,
    ...productDefinitionsServices,
    PrismaService,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
