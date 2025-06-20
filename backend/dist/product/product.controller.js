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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_dto_1 = require("./product.dto");
const category_service_1 = require("../category/category.service");
const sku_service_1 = require("../sku/sku.service");
const tags_service_1 = require("../tags/tags.service");
const swagger_1 = require("@nestjs/swagger");
const product_query_service_1 = require("./product.query.service");
const product_creation_service_1 = require("./product.creation.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ProductController = class ProductController {
    constructor(productQueryService, productCreationService, categoryService, skuService, tagsService) {
        this.productQueryService = productQueryService;
        this.productCreationService = productCreationService;
        this.categoryService = categoryService;
        this.skuService = skuService;
        this.tagsService = tagsService;
    }
    async createProduct(productDto) {
        const { name, color, size, categoryName, tags } = productDto;
        const category = await this.categoryService.findOrCreateCategory(categoryName);
        const resolvedTags = tags
            ? await this.tagsService.findOrCreateTags(tags)
            : [];
        const sku = this.skuService.generateSku(name, categoryName, color, size);
        return this.productCreationService.createProduct(productDto, category, sku, resolvedTags);
    }
    async getProductDetails(sku) {
        return this.productQueryService.getProductDetails(sku.sku);
    }
    async getProductsByCategory(categoryId) {
        const products = await this.productQueryService.getProductsByCategory(categoryId.categoryId);
        return products;
    }
    async getProductsByTags(tags, skip = '0') {
        const tagsArray = tags.split(',');
        const skipNumber = parseInt(skip, 10);
        const products = await this.productQueryService.getProductsByTags(tagsArray, isNaN(skipNumber) ? 0 : skipNumber);
        return products;
    }
    async getProducts(pages, limit, orderBy, order, categoryId) {
        const { products, totalProducts } = await this.productQueryService.getProducts(pages, limit, orderBy, order, categoryId);
        return { products, totalProducts };
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Create a product' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: `The product has been successfully created`,
        type: product_dto_1.ProductDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.ProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)('details/:sku'),
    (0, swagger_1.ApiOperation)({ summary: 'Get product details' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return the product details',
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductDetails", null);
__decorate([
    (0, common_1.Get)('getProductsByCategory/:categoryId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get products by category' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return the products by category',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductsByCategory", null);
__decorate([
    (0, common_1.Get)('getProductsByTags/:tags'),
    (0, swagger_1.ApiOperation)({ summary: 'Get products by tags' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return the products by tags',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('tags')),
    __param(1, (0, common_1.Query)('skip')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductsByTags", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get products' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return the products',
    }),
    __param(0, (0, common_1.Query)('pages', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('orderBy')),
    __param(3, (0, common_1.Query)('order')),
    __param(4, (0, common_1.Query)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProducts", null);
exports.ProductController = ProductController = __decorate([
    (0, swagger_1.ApiTags)('product'),
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_query_service_1.ProductQueryService,
        product_creation_service_1.ProductCreationService,
        category_service_1.CategoryService,
        sku_service_1.SkuService,
        tags_service_1.TagsService])
], ProductController);
//# sourceMappingURL=product.controller.js.map