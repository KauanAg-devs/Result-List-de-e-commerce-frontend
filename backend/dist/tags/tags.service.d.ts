import { PrismaService } from 'src/prisma.service';
import { TagDto } from './tag.dto';
export declare class TagsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(TagDto: TagDto): import(".prisma/client").Prisma.Prisma__TagClient<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findOrCreateTags(tags: string[]): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
