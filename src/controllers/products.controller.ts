import {inject} from '@loopback/context';
import {Filter, Where, repository} from '@loopback/repository';
import {
  post,
  param,
  get,
  patch,
  del,
  requestBody,
  HttpErrors
} from '@loopback/rest';
import {Products} from '../models';
import {ProductsRepository} from '../repositories';
import {
  authenticate,
  AuthenticationBindings,
} from '@loopback/authentication';
import {User} from '../constants/interfaces';
import { v4 as uuid } from 'uuid';

export class ProductsController {
  constructor(
    @repository(ProductsRepository)
    public productsRepository : ProductsRepository,
    @inject(AuthenticationBindings.CURRENT_USER) private user: User,
  ) {}

  @post('/products')
  async create(@requestBody() obj: Products)
    : Promise<Products> {
    obj.id = uuid();
    return await this.productsRepository.create(obj);
  }

  @get('/products/count')
  async count(@param.query.string('where') where?: Where): Promise<number> {
    return await this.productsRepository.count(where);
  }

  @authenticate('JwtStrategy')
  @get('/products')
  async find(@param.query.string('filter') filter?: Filter)
    : Promise<Products[]> {
    // throw new HttpErrors.UnprocessableEntity('kek');
    return this.productsRepository.find(filter);
  }

  @patch('/products')
  async updateAll(
    @requestBody() obj: Products,
    @param.query.string('where') where?: Where
  ): Promise<number> {
    return await this.productsRepository.updateAll(obj, where);
  }

  @get('/products/{id}')
  async findById(@param.path.string('id') id: string): Promise<Products> {
    return await this.productsRepository.findById(id);
  }

  @patch('/products/{id}')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() obj: Products
  ): Promise<boolean> {
    return await this.productsRepository.updateById(id, obj);
  }

  @del('/products/{id}')
  async deleteById(@param.path.string('id') id: string): Promise<boolean> {
    return await this.productsRepository.deleteById(id);
  }
}
