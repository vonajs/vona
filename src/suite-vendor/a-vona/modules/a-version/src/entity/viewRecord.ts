import { Entity, EntityBase } from 'vona-module-a-database';
import { OmitType } from 'vona-module-a-swagger';

@Entity('aViewRecord')
export class EntityViewRecord extends OmitType(EntityBase, ['iid']) {
  viewName: string;
  viewSql: string;
}
