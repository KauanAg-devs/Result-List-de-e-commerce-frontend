import { CategoryService } from './category.service';
import { Category } from '@prisma/client';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    getAllCategories(): Promise<Category[]>;
}
