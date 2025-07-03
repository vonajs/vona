import type { IDecoratorEntityOptions, TableIdentity } from 'vona-module-a-database';
import { Entity, EntityBase } from 'vona-module-a-database';
import { Api, v } from 'vona-module-a-openapi';

export interface IEntityOptionsRoleUser extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsRoleUser>('testVonaRoleUser')
export class EntityRoleUser extends EntityBase {
  @Api.field(v.tableIdentity())
  userId: TableIdentity;

  @Api.field(v.tableIdentity())
  roleId: TableIdentity;
}
