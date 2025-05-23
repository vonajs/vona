import type { IDecoratorEntityOptions } from 'vona-module-a-database';
import { ClassMapped } from 'vona';
import { Entity, EntityBaseSimple } from 'vona-module-a-database';

export interface IEntityOptionsViewRecord extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsViewRecord>('aViewRecord')
export class EntityViewRecord extends ClassMapped.omit(EntityBaseSimple, ['iid']) {
  viewName: string;
  viewSql: string;
}
