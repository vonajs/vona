import type { TableIdentity } from './tableIdentity.ts';
import { Rule, v } from 'vona-module-a-openapi';
import { EntityBaseInner } from './entityBaseInner.ts';

export class EntityBase extends EntityBaseInner {
  @Rule(v.tableIdentity())
  id: TableIdentity;
}
