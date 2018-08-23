import {Filter, Where, repository} from '@loopback/repository';
import {
  post,
  param,
  get,
  patch,
  del,
  requestBody
} from '@loopback/rest';
import {Users} from '../models';
import {UsersRepository} from '../repositories';

export class ProfileController {
  constructor(
    @repository(UsersRepository)
    public usersRepository : UsersRepository,
  ) {}

  @post('/profile')
  async create(@requestBody() obj: Users)
    : Promise<Users> {
    return await this.usersRepository.create(obj);
  }

  @get('/profile/count')
  async count(@param.query.string('where') where?: Where): Promise<number> {
    return await this.usersRepository.count(where);
  }

  @get('/profile')
  async find(@param.query.string('filter') filter?: Filter)
    : Promise<Users[]> {
    return await this.usersRepository.find(filter);
  }

  @patch('/profile')
  async updateAll(
    @requestBody() obj: Users,
    @param.query.string('where') where?: Where
  ): Promise<number> {
    return await this.usersRepository.updateAll(obj, where);
  }

  @get('/profile/{id}')
  async findById(@param.path.string('id') id: string): Promise<Users> {
    return await this.usersRepository.findById(id);
  }

  @patch('/profile/{id}')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() obj: Users
  ): Promise<boolean> {
    return await this.usersRepository.updateById(id, obj);
  }

  @del('/profile/{id}')
  async deleteById(@param.path.string('id') id: string): Promise<boolean> {
    return await this.usersRepository.deleteById(id);
  }
}
