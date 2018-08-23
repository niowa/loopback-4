import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Products} from '../models';
import {inject} from '@loopback/core';

export class ProductsRepository extends DefaultCrudRepository<
  Products,
  typeof Products.prototype.id
  > {
  constructor(
    @inject('datasources.postgres') protected postgres: juggler.DataSource,
  ) {
    super(Products, postgres);
  }
}
