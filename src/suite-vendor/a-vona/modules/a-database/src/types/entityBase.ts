import type { TableIdentity } from './tableIdentity.ts';
import { Api, OrderCoreBase, v } from 'vona-module-a-openapi';
import { $locale } from '../.metadata/index.ts';
import { EntityBaseInner } from './entityBaseInner.ts';

export class EntityBase extends EntityBaseInner {
  @Api.field(v.openapi({ description: $locale('TableIdentity'), rest: { order: OrderCoreBase + 1 } }), v.tableIdentity())
  id: TableIdentity;
}
