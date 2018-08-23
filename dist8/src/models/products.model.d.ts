import { Entity } from '@loopback/repository';
export declare class Products extends Entity {
    id: string;
    name: string;
    description?: string;
    constructor(data?: Partial<Products>);
}
