import type { IDecoratorEntityOptions } from 'vona-module-a-orm';
import { Api } from 'vona-module-a-openapi';
import { Entity, EntityBase } from 'vona-module-a-orm';

export interface IEntityOptionsUser extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsUser>('testVonaUser')
export class EntityUser extends EntityBase {
  @Api.field()
  name: string;
}
