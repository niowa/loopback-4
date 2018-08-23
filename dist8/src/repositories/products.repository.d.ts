import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Products } from '../models';
export declare class ProductsRepository extends DefaultCrudRepository<Products, typeof Products.prototype.id> {
    protected postgres: juggler.DataSource;
    constructor(postgres: juggler.DataSource);
}
