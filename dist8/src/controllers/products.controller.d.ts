import { Filter, Where } from '@loopback/repository';
import { Products } from '../models';
import { ProductsRepository } from '../repositories';
import { User } from '../constants/interfaces';
export declare class ProductsController {
    productsRepository: ProductsRepository;
    private user;
    constructor(productsRepository: ProductsRepository, user: User);
    create(obj: Products): Promise<Products>;
    count(where?: Where): Promise<number>;
    find(filter?: Filter): Promise<Products[]>;
    updateAll(obj: Products, where?: Where): Promise<number>;
    findById(id: string): Promise<Products>;
    updateById(id: string, obj: Products): Promise<boolean>;
    deleteById(id: string): Promise<boolean>;
}
