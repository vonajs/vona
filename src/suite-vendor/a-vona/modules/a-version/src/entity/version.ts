import type { IDecoratorEntityOptions } from 'vona-module-a-database';
import { ClassMapped } from 'vona';
import { Entity, EntityBaseSimple } from 'vona-module-a-database';
import { Api } from 'vona-module-a-openapi';

export interface IEntityOptionsVersion extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsVersion>('aVersion')
export class EntityVersion extends ClassMapped.omit(EntityBaseSimple, ['iid', 'deleted']) {
  @Api.field()
  module: string;

  @Api.field()
  version: number;
}
