import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TagDto } from './tag.dto';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  create(TagDto: TagDto) {
    return this.prisma.tag.create({
      data: TagDto,
    });
  }
  async findOrCreateTags(tags: string[]) {
    return Promise.all(
      tags.map(async (tag) => {
        const existingTag = await this.prisma.tag.findUnique({
          where: { name: tag },
        });

        return existingTag ?? this.create({ name: tag });
      }),
    );
  }
}
