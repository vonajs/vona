import type { IDecoratorEntityOptions, TableIdentity } from 'vona-module-a-database';
import { Entity, EntityBase } from 'vona-module-a-database';
import { Api, v } from 'vona-module-a-openapi';

export interface IEntityOptionsUserRole extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsUserRole>('homeUserRole')
export class EntityUserRole extends EntityBase {
  @Api.field(v.tableIdentity())
  userId: TableIdentity;

  @Api.field(v.tableIdentity())
  roleId: TableIdentity;
}
