import type { IDecoratorEntityOptions, TableIdentity } from 'vona-module-a-orm';
import { Api, v } from 'vona-module-a-openapi';
import { Entity, EntityBase } from 'vona-module-a-orm';

export interface IEntityOptionsCategory extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsCategory>('testVonaCategory')
export class EntityCategory extends EntityBase {
  @Api.field()
  name: string;

  @Api.field(v.optional(), v.tableIdentity())
  categoryIdParent?: TableIdentity;
}
