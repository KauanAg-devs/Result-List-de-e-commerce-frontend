"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkuService = void 0;
const common_1 = require("@nestjs/common");
let SkuService = class SkuService {
    generateSku(productName, categoryName, color, size) {
        const timestamp = new Date().getTime().toString(36);
        const normalizedProductName = productName
            .replace(/\s+/g, '-')
            .toUpperCase();
        const normalizedCategoryName = categoryName
            .replace(/\s+/g, '-')
            .toUpperCase();
        if (color && size && categoryName) {
            const normalizedColor = color.replace(/\s+/g, '-').toUpperCase();
            const normalizedSize = size.toUpperCase();
            return `SKU-${normalizedProductName}-${normalizedCategoryName}-${normalizedColor}-${normalizedSize}-${timestamp}`;
        }
        return `SKU-${normalizedProductName}-${timestamp}`;
    }
};
exports.SkuService = SkuService;
exports.SkuService = SkuService = __decorate([
    (0, common_1.Injectable)()
], SkuService);
//# sourceMappingURL=sku.service.js.map