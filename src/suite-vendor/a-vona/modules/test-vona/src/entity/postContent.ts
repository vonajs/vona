import type { IDecoratorEntityOptions, TableIdentity } from 'vona-module-a-orm';
import { Entity, EntityBase } from 'vona-module-a-orm';
import { Api, v } from 'vona-module-a-openapi';

export interface IEntityOptionsPostContent extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsPostContent>('testVonaPostContent')
export class EntityPostContent extends EntityBase {
  @Api.field()
  content: string;

  @Api.field(v.tableIdentity())
  postId: TableIdentity;
}
