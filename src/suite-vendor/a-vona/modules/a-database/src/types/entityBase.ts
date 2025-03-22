import type { TableIdentity } from './tableIdentity.ts';
import { Api, v } from 'vona-module-a-openapi';
import { EntityBaseInner } from './entityBaseInner.ts';

export class EntityBase extends EntityBaseInner {
  @Api.field(v.tableIdentity())
  id: TableIdentity;
}
