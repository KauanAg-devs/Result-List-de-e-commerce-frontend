import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductDto } from './product.dto';
import { CategoryService } from 'src/category/category.service';
import { SkuService } from 'src/sku/sku.service';
import { TagsService } from 'src/tags/tags.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductQueryService } from './product.query.service';
import { ProductCreationService } from './product.creation.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(
    private productQueryService: ProductQueryService,
    private productCreationService: ProductCreationService,
    private categoryService: CategoryService,
    private skuService: SkuService,
    private tagsService: TagsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a product' })
  @ApiResponse({
    status: 201,
    description: `The product has been successfully created`,
    type: ProductDto,
  })
  async createProduct(@Body() productDto: ProductDto) {
    const { name, color, size, categoryName, tags } = productDto;
    const category =
      await this.categoryService.findOrCreateCategory(categoryName);

    const resolvedTags = tags
      ? await this.tagsService.findOrCreateTags(tags)
      : [];

    const sku = this.skuService.generateSku(name, categoryName, color, size);

    return this.productCreationService.createProduct(
      productDto,
      category,
      sku,
      resolvedTags,
    );
  }

  @Get('details/:sku')
  @ApiOperation({ summary: 'Get product details' })
  @ApiResponse({
    status: 200,
    description: 'Return the product details',
  })
  async getProductDetails(@Param() sku: { sku: string }) {
    return this.productQueryService.getProductDetails(sku.sku);
  }

  @Get('getProductsByCategory/:categoryId')
  @ApiOperation({ summary: 'Get products by category' })
  @ApiResponse({
    status: 200,
    description: 'Return the products by category',
  })
  @UseGuards(JwtAuthGuard)
  async getProductsByCategory(@Param() categoryId: { categoryId: string }) {
    const products = await this.productQueryService.getProductsByCategory(
      categoryId.categoryId,
    );
    return products;
  }

  @Get('getProductsByTags/:tags')
  @ApiOperation({ summary: 'Get products by tags' })
  @ApiResponse({
    status: 200,
    description: 'Return the products by tags',
  })
  @UseGuards(JwtAuthGuard)
  async getProductsByTags(
    @Param('tags') tags: string,
    @Query('skip') skip: string = '0',
  ) {
    const tagsArray = tags.split(',');
    const skipNumber = parseInt(skip, 10);

    const products = await this.productQueryService.getProductsByTags(
      tagsArray,
      isNaN(skipNumber) ? 0 : skipNumber,
    );
    return products;
  }

  @Get()
  @ApiOperation({ summary: 'Get products' })
  @ApiResponse({
    status: 200,
    description: 'Return the products',
  })
  async getProducts(
    @Query('pages', ParseIntPipe) pages?: number,
    @Query('limit', ParseIntPipe) limit?: number,
    @Query('orderBy') orderBy?: 'price' | 'discount' | 'name',
    @Query('order') order?: 'asc' | 'desc',
    @Query('categoryId') categoryId?: string,
  ) {
    const { products, totalProducts } =
      await this.productQueryService.getProducts(
        pages,
        limit,
        orderBy,
        order,
        categoryId,
      );

    return { products, totalProducts };
  }
}
