import type { IDecoratorEntityOptions } from 'vona-module-a-orm';
import { Entity, EntityBase } from 'vona-module-a-orm';
import { Api } from 'vona-module-a-openapi';

export interface IEntityOptionsRole extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsRole>('testVonaRole')
export class EntityRole extends EntityBase {
  @Api.field()
  name: string;
}
