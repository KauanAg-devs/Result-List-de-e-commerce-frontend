import { PrismaService } from 'src/prisma.service';
import { ProductDto } from './product.dto';
export declare class ProductCreationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createProduct(productDto: ProductDto, category: {
        id: string;
    }, sku: string, tags?: {
        name: string;
    }[] | undefined): Promise<{
        id: string;
        name: string;
        image: string;
        title: string;
        price: number;
        discount: number | null;
        createdAt: Date;
        updatedAt: Date;
        sku: string;
    }>;
}
