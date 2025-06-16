import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [TagsService, PrismaService],
  controllers: [],
})
export class TagsModule {}
