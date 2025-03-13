import { Entity, EntityBase, TableIdentity } from 'vona-module-a-database';
import { Rule, v } from 'vona-module-a-openapi';

@Entity('aAuth')
export class EntityAuth extends EntityBase {
  @Rule(v.tableIdentity())
  userId: TableIdentity;

  @Rule()
  authProviderId: TableIdentity;

  @Rule()
  profileId: string;

  @Rule()
  profile: string;
}
