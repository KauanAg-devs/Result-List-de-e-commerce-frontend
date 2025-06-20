import { PrismaService } from 'src/prisma.service';
export declare class ProductQueryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getProducts(page?: number, limit?: number, sortBy?: 'name' | 'discount' | 'price', order?: 'asc' | 'desc', categoryId?: string): any;
    getProductDetails(sku: string): import(".prisma/client").Prisma.Prisma__ProductDetailsClient<{
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
        tags: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        description: string;
        categoryId: string | null;
        sku: string;
        createdAt: Date;
        updatedAt: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    getProductsByCategory(categoryId: string): Promise<{
        id: string;
        name: string;
        image: string;
        title: string;
        price: number;
        discount: number | null;
        createdAt: Date;
        updatedAt: Date;
        sku: string;
    }[]>;
    getProductsByTags(tags: string[], skip?: number): Promise<{
        id: string;
        name: string;
        image: string;
        title: string;
        price: number;
        discount: number | null;
        createdAt: Date;
        updatedAt: Date;
        sku: string;
    }[]>;
}
