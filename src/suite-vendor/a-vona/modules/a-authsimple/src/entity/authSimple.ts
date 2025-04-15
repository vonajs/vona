import { Entity, EntityBase, TableIdentity } from 'vona-module-a-database';
import { Api, v } from 'vona-module-a-openapi';

@Entity('aAuthSimple')
export class EntityAuthSimple extends EntityBase {
  @Api.field(v.tableIdentity())
  userId: TableIdentity;

  @Api.field()
  hash: string;
}
