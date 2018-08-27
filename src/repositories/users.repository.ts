import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Users} from '../models';
import {inject} from '@loopback/core';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id
  > {
  constructor(
    @inject('datasources.postgres') protected postgres: juggler.DataSource,
  ) {
    super(Users, postgres);
  }
}
