import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  create(category: CategoryDto) {
    return this.prisma.category.create({
      data: category,
    });
  }

  async findOrCreateCategory(categoryName: string) {
    let category = await this.prisma.category.findUnique({
      where: { name: categoryName.toLowerCase() },
    });

    if (!category) {
      category = await this.create({ name: categoryName });
    }

    return category;
  }

  findAll() {
    return this.prisma.category.findMany();
  }
}
