import type { IDecoratorEntityOptions } from 'vona-module-a-database';
import { Entity, EntityBase } from 'vona-module-a-database';
import { Api } from 'vona-module-a-openapi';

export interface IEntityOptionsTest extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsTest>('testVonaTest')
export class EntityTest extends EntityBase {
  @Api.field()
  title: string;

  @Api.field()
  description: string;
}
