import { Entity } from '@loopback/repository';
export declare class Id extends Entity {
    number?: number;
    name: string;
    constructor(data?: Partial<Id>);
}
