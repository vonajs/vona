import type { TableIdentity } from './tableIdentity.ts';
import { Rule, v } from 'vona-module-a-openapi';
import { EntityBaseSimple } from './entityBaseSimple.ts';

export class EntityProBase extends EntityBaseSimple {
  @Rule(v.tableIdentity())
  id: TableIdentity;
}
