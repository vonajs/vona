import type { IDecoratorEntityOptions, TableIdentity } from 'vona-module-a-database';
import { Entity, EntityBase } from 'vona-module-a-database';
import { Api, v } from 'vona-module-a-openapi';

export interface IEntityOptionsPost extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsPost>('testVonaPost')
export class EntityPost extends EntityBase {
  @Api.field()
  title: string;

  @Api.field(v.tableIdentity())
  userId: TableIdentity;
}
