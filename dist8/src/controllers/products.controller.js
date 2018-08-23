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
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const uuid_1 = require("uuid");
let ProductsController = class ProductsController {
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }
    async create(obj) {
        obj.id = uuid_1.v4();
        return await this.productsRepository.create(obj);
    }
    async count(where) {
        return await this.productsRepository.count(where);
    }
    async find(filter) {
        const result = await this.productsRepository.find(filter);
        console.log(result);
        throw new rest_1.HttpErrors.UnprocessableEntity('kek');
    }
    async updateAll(obj, where) {
        return await this.productsRepository.updateAll(obj, where);
    }
    async findById(id) {
        return await this.productsRepository.findById(id);
    }
    async updateById(id, obj) {
        return await this.productsRepository.updateById(id, obj);
    }
    async deleteById(id) {
        return await this.productsRepository.deleteById(id);
    }
};
__decorate([
    rest_1.post('/products'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Products]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    rest_1.get('/products/count'),
    __param(0, rest_1.param.query.string('where')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "count", null);
__decorate([
    rest_1.get('/products'),
    __param(0, rest_1.param.query.string('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "find", null);
__decorate([
    rest_1.patch('/products'),
    __param(0, rest_1.requestBody()),
    __param(1, rest_1.param.query.string('where')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Products, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateAll", null);
__decorate([
    rest_1.get('/products/{id}'),
    __param(0, rest_1.param.path.string('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findById", null);
__decorate([
    rest_1.patch('/products/{id}'),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.Products]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateById", null);
__decorate([
    rest_1.del('/products/{id}'),
    __param(0, rest_1.param.path.string('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteById", null);
ProductsController = __decorate([
    __param(0, repository_1.repository(repositories_1.ProductsRepository)),
    __metadata("design:paramtypes", [repositories_1.ProductsRepository])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map