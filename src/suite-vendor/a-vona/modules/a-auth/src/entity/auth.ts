import type { IDecoratorEntityOptions } from 'vona-module-a-orm';
import { Api, v } from 'vona-module-a-openapi';
import { Entity, EntityBase, TableIdentity } from 'vona-module-a-orm';

export interface IEntityOptionsAuth extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsAuth>('aAuth')
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
