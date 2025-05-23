import { Api, v } from 'vona-module-a-openapi';
import { $locale } from '../.metadata/index.ts';
import { EntityBaseEmpty } from './entityBaseEmpty.ts';

export class EntityBaseInner extends EntityBaseEmpty {
  @Api.field(v.openapi({ description: $locale('CreatedAt') }))
  createdAt: Date;

  @Api.field(v.openapi({ description: $locale('UpdatedAt') }))
  updatedAt: Date;

  @Api.field(v.openapi({ description: $locale('Deleted') }))
  deleted: boolean;

  @Api.field(v.openapi({ description: $locale('InstanceId') }))
  iid: number;
}
