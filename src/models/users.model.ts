import {Entity, model, property} from '@loopback/repository';

@model()
export class Users extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
  })
  key?: string;

  @property({
    type: 'string',
  })
  created_at?: string;

  constructor(data?: Partial<Users>) {
    super(data);
  }
}
