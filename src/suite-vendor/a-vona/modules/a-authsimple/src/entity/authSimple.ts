import type { TableIdentity } from 'table-identity';
import type { IDecoratorEntityOptions } from 'vona-module-a-orm';
import { Api, v } from 'vona-module-a-openapi';
import { Entity, EntityBase } from 'vona-module-a-orm';

export interface IEntityOptionsAuthSimple extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsAuthSimple>('aAuthSimple')
export class EntityAuthSimple extends EntityBase {
  @Api.field(v.tableIdentity())
  userId: TableIdentity;

  @Api.field()
  hash: string;
}
