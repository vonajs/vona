import { OmitClass } from 'vona';
import { Entity, EntityBaseSimple } from 'vona-module-a-database';

@Entity('aViewRecord')
export class EntityViewRecord extends OmitClass(EntityBaseSimple, ['iid']) {
  viewName: string;
  viewSql: string;
}
