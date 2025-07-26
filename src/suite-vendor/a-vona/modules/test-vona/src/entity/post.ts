import type { IDecoratorEntityOptions, TableIdentity } from 'vona-module-a-orm';
import { Api, v } from 'vona-module-a-openapi';
import { Entity, EntityBase } from 'vona-module-a-orm';

export interface IEntityOptionsPost extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsPost>('testVonaPost')
export class EntityPost extends EntityBase {
  @Api.field()
  title: string;

  @Api.field(v.tableIdentity())
  userId: TableIdentity;

  @Api.field(v.optional())
  stars?: number;
}
