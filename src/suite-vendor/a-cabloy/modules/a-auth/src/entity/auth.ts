import { Entity, EntityProBase, TableIdentity } from 'vona-module-a-database';
import { Rule, v } from 'vona-module-a-openapi';

@Entity('aAuth')
export class EntityAuth extends EntityProBase {
  @Rule(v.tableIdentity())
  userId: TableIdentity;

  @Rule()
  authProviderId: number;

  @Rule()
  profileId: string;

  @Rule()
  profile: string;
}
