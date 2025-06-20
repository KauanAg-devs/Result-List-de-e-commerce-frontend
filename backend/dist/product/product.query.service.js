"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductQueryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ProductQueryService = class ProductQueryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProducts(page = 1, limit = 16, sortBy = 'price', order = 'asc', categoryId) {
        const totalProductsInCategory = await this.prisma.productDetails.count({
            where: categoryId ? { categoryId } : undefined,
        });
        const productDetails = await this.prisma.productDetails.findMany({
            where: categoryId ? { categoryId } : undefined,
            take: limit,
            skip: (page - 1) * limit,
        });
        const skus = productDetails.map((detail) => detail.sku);
        const products = await this.prisma.product.findMany({
            where: { sku: { in: skus } },
            orderBy: { [sortBy]: order },
        });
        if (products.length === 0 && page > 1) {
            return this.getProducts(1, limit, sortBy, order, categoryId);
        }
        return {
            products,
            totalProducts: totalProductsInCategory,
        };
    }
    getProductDetails(sku) {
        return this.prisma.productDetails.findUnique({
            where: { sku: sku },
            include: { tags: true, category: true },
        });
    }
    async getProductsByCategory(categoryId) {
        const productDetails = await this.prisma.productDetails.findMany({
            where: { categoryId },
            take: 4,
        });
        if (productDetails.length === 0)
            return [];
        const skus = productDetails.map((product) => product.sku);
        const products = await this.prisma.product.findMany({
            where: { sku: { in: skus } },
        });
        return products;
    }
    async getProductsByTags(tags, skip = 0) {
        const productsDetails = await this.prisma.productDetails.findMany({
            where: {
                tags: { some: { name: { in: tags } } },
            },
            include: { product: true },
            take: 4,
            skip,
        });
        return productsDetails.map((product) => product.product);
    }
};
exports.ProductQueryService = ProductQueryService;
exports.ProductQueryService = ProductQueryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductQueryService);
//# sourceMappingURL=product.query.service.js.map