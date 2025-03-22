import { Entity, EntityBase, TableIdentity } from 'vona-module-a-database';
import { Api, v } from 'vona-module-a-openapi';

@Entity('aAuth')
export class EntityAuth extends EntityBase {
  @Api.field(v.tableIdentity())
  userId: TableIdentity;

  @Api.field()
  authProviderId: number;

  @Api.field()
  profileId: string;

  @Api.field()
  profile: string;
}
