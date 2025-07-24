import { Api, OrderCoreBase, v } from 'vona-module-a-openapi';
import { $locale } from '../.metadata/index.ts';
import { EntityBaseInner } from './entityBaseInner.ts';

export class EntityBaseSimple extends EntityBaseInner {
  @Api.field(v.openapi({ title: $locale('TableIdentity'), rest: { order: OrderCoreBase + 1 } }))
  id: number;
}
