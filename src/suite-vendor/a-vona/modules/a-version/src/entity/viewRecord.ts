import { OmitClass } from 'vona';
import { Entity, EntityBase } from 'vona-module-a-database';

@Entity('aViewRecord')
export class EntityViewRecord extends OmitClass(EntityBase, ['iid']) {
  viewName: string;
  viewSql: string;
}
