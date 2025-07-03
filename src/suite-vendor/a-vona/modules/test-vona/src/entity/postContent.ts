import type { IDecoratorEntityOptions, TableIdentity } from 'vona-module-a-database';
import { Entity, EntityBase } from 'vona-module-a-database';
import { Api, v } from 'vona-module-a-openapi';

export interface IEntityOptionsPostContent extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsPostContent>('testVonaPostContent')
export class EntityPostContent extends EntityBase {
  @Api.field()
  content: string;

  @Api.field(v.tableIdentity())
  postId: TableIdentity;
}
