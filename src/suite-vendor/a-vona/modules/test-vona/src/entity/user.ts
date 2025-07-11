import type { IDecoratorEntityOptions } from 'vona-module-a-database';
import { Entity, EntityBase } from 'vona-module-a-database';
import { Api } from 'vona-module-a-openapi';

export interface IEntityOptionsUser extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsUser>('testVonaUser')
export class EntityUser extends EntityBase {
  @Api.field()
  name: string;
}
