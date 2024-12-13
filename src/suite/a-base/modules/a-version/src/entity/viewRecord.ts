import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';
import { OmitType } from 'vona-module-a-swagger';

@Entity('aViewRecord')
export class EntityViewRecord extends OmitType(EntityBaseTemp, ['iid']) {
  viewName: string;
  viewSql: string;
}
