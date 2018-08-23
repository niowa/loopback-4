import {Entity, model, property} from '@loopback/repository';

@model()
export class Id extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  number?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  constructor(data?: Partial<Id>) {
    super(data);
  }
}
