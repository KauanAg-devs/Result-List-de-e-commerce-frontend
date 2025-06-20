import { Injectable } from '@nestjs/common';

@Injectable()
export class SkuService {
  generateSku(
    productName: string,
    categoryName: string,
    color?: string,
    size?: string,
  ): string {
    const timestamp = new Date().getTime().toString(36);

    const normalizedProductName = productName
      .replace(/\s+/g, '-')
      .toUpperCase();

    const normalizedCategoryName = categoryName
      .replace(/\s+/g, '-')
      .toUpperCase();

    if (color && size && categoryName) {
      const normalizedColor = color.replace(/\s+/g, '-').toUpperCase();
      const normalizedSize = size.toUpperCase();
      return `SKU-${normalizedProductName}-${normalizedCategoryName}-${normalizedColor}-${normalizedSize}-${timestamp}`;
    }
    return `SKU-${normalizedProductName}-${timestamp}`;
  }
}
