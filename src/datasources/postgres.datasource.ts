import {inject} from '@loopback/core';
import {juggler, DataSource, AnyObject} from '@loopback/repository';
const config = require('./postgres.datasource.json');

export class PostgresDataSource extends juggler.DataSource {
  static dataSourceName = 'postgres';

  constructor(
    @inject('datasources.config.postgres', {optional: true})
    dsConfig: AnyObject = config
  ) {
    super(dsConfig);
  }
}
