import { ProductDto } from './product.dto';
import { CategoryService } from 'src/category/category.service';
import { SkuService } from 'src/sku/sku.service';
import { TagsService } from 'src/tags/tags.service';
import { ProductQueryService } from './product.query.service';
import { ProductCreationService } from './product.creation.service';
export declare class ProductController {
    private productQueryService;
    private productCreationService;
    private categoryService;
    private skuService;
    private tagsService;
    constructor(productQueryService: ProductQueryService, productCreationService: ProductCreationService, categoryService: CategoryService, skuService: SkuService, tagsService: TagsService);
    createProduct(productDto: ProductDto): Promise<{
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
    getProductDetails(sku: {
        sku: string;
    }): Promise<{
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
    }>;
    getProductsByCategory(categoryId: {
        categoryId: string;
    }): Promise<{
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
    getProductsByTags(tags: string, skip?: string): Promise<{
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
    getProducts(pages?: number, limit?: number, orderBy?: 'price' | 'discount' | 'name', order?: 'asc' | 'desc', categoryId?: string): Promise<{
        products: any;
        totalProducts: any;
    }>;
}
