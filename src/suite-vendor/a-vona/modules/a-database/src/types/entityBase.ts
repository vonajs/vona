import type { TableIdentity } from './tableIdentity.ts';
import { Api, v } from 'vona-module-a-openapi';
import { $locale } from '../.metadata/index.ts';
import { EntityBaseInner } from './entityBaseInner.ts';

export class EntityBase extends EntityBaseInner {
  @Api.field(v.openapi({ description: $locale('TableIdentity') }), v.tableIdentity())
  id: TableIdentity;
}
