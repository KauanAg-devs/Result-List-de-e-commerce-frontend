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
exports.ProductCreationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ProductCreationService = class ProductCreationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createProduct(productDto, category, sku, tags) {
        const { name, image, title, price, discount, description } = productDto;
        try {
            const product = await this.prisma.product.create({
                data: { sku, name, image, title, price, discount },
            });
            await this.prisma.productDetails.create({
                data: {
                    description,
                    sku: product.sku,
                    categoryId: category.id,
                    tags: { connect: tags },
                },
            });
            return product;
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException(`Error creating product: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ProductCreationService = ProductCreationService;
exports.ProductCreationService = ProductCreationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductCreationService);
//# sourceMappingURL=product.creation.service.js.map