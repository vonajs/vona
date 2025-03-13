import { Entity, EntityBase, TableIdentity } from 'vona-module-a-database';
import { Rule, v } from 'vona-module-a-openapi';

@Entity('aAuthSimple')
export class EntityAuthSimple extends EntityBase {
  @Rule(v.tableIdentity())
  userId: TableIdentity;

  @Rule()
  hash: string;
}
