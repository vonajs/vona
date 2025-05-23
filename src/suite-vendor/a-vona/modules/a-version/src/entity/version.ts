import type { IDecoratorEntityOptions } from 'vona-module-a-database';
import { ClassMapped } from 'vona';
import { Entity, EntityBaseSimple } from 'vona-module-a-database';

export interface IEntityOptionsVersion extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsVersion>('aVersion')
export class EntityVersion extends ClassMapped.omit(EntityBaseSimple, ['iid', 'deleted']) {
  module: string;
  version: number;
}
