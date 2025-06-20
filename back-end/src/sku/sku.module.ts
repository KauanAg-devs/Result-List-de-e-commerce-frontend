import { Module } from '@nestjs/common';
import { SkuService } from './sku.service';

@Module({
  providers: [SkuService],
  exports: [SkuService],
})
export class SkuModule {}
