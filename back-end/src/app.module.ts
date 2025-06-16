import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { SkuModule } from './sku/sku.module';
import { CategoryModule } from './category/category.module';
import { TagsModule } from './tags/tags.module';

const userRelatedModules = [UserModule, AuthModule];
const productRelatedModules = [
  ProductModule,
  SkuModule,
  CategoryModule,
  TagsModule,
];
@Module({
  imports: [...userRelatedModules, ...productRelatedModules],
  controllers: [],
  providers: [],
})
export class AppModule {}
