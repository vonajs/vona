import { ClassMapped } from 'vona';
import { Entity, EntityBaseSimple } from 'vona-module-a-database';

@Entity('aViewRecord')
export class EntityViewRecord extends ClassMapped.omit(EntityBaseSimple, ['iid']) {
  viewName: string;
  viewSql: string;
}
