import { Entity, EntityBase, TableIdentity } from 'vona-module-a-database';
import { Api, v } from 'vona-module-a-openapi';

@Entity('homeAuth')
export class EntityAuth extends EntityBase {
  @Api.field(v.tableIdentity())
  id: TableIdentity;
}
