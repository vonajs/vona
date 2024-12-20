import { omitClass } from 'vona';
import { Entity, EntityBase } from 'vona-module-a-database';

@Entity('aViewRecord')
export class EntityViewRecord extends omitClass(EntityBase, ['iid']) {
  viewName: string;
  viewSql: string;
}
