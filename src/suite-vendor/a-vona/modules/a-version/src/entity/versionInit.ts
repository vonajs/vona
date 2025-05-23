import type { IDecoratorEntityOptions } from 'vona-module-a-database';
import { ClassMapped } from 'vona';
import { Entity, EntityBaseSimple } from 'vona-module-a-database';

export interface IEntityOptionsVersionInit extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsVersionInit>('aVersionInit')
export class EntityVersionInit extends ClassMapped.omit(EntityBaseSimple, ['iid', 'deleted']) {
  instanceName: string;
  module: string;
  version: number;
}
