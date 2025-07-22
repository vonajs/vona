import { Api, OrderMaxBase, v } from 'vona-module-a-openapi';
import { $locale } from '../.metadata/index.ts';
import { EntityBaseEmpty } from './entityBaseEmpty.ts';

export class EntityBaseInner extends EntityBaseEmpty {
  @Api.field(v.openapi({ title: $locale('CreatedAt'), rest: { order: OrderMaxBase - 2 } }))
  createdAt: Date;

  @Api.field(v.openapi({ title: $locale('UpdatedAt'), rest: { order: OrderMaxBase - 1 } }))
  updatedAt: Date;

  @Api.field(v.openapi({ title: $locale('Deleted'), rest: { visible: false } }), v.default(false))
  deleted: boolean;

  @Api.field(v.openapi({ title: $locale('InstanceId'), rest: { visible: false } }), v.default(0))
  iid: number;
}
