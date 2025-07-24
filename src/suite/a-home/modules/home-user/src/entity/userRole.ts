import type { IDecoratorEntityOptions, TableIdentity } from 'vona-module-a-orm';
import { Api, v } from 'vona-module-a-openapi';
import { Entity, EntityBase } from 'vona-module-a-orm';

export interface IEntityOptionsUserRole extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsUserRole>('homeUserRole')
export class EntityUserRole extends EntityBase {
  @Api.field(v.tableIdentity())
  userId: TableIdentity;

  @Api.field(v.tableIdentity())
  roleId: TableIdentity;
}
