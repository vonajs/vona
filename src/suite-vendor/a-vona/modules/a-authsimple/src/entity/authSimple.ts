import type { IDecoratorEntityOptions } from 'vona-module-a-database';
import { Entity, EntityBase, TableIdentity } from 'vona-module-a-database';
import { Api, v } from 'vona-module-a-openapi';

export interface IEntityOptionsAuthSimple extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsAuthSimple>('aAuthSimple')
export class EntityAuthSimple extends EntityBase {
  @Api.field(v.tableIdentity())
  userId: TableIdentity;

  @Api.field()
  hash: string;
}
