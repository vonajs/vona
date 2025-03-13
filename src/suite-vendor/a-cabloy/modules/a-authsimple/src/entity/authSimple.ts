import { Entity, EntityProBase, TableIdentity } from 'vona-module-a-database';
import { Rule, v } from 'vona-module-a-openapi';

@Entity('aAuthSimple')
export class EntityAuthSimple extends EntityProBase {
  @Rule(v.tableIdentity())
  userId: TableIdentity;

  @Rule()
  hash: string;
}
