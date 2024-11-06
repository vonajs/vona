import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aViewRecord')
export class EntityViewRecord extends Omit<EntityBaseTemp, 'iid'> {
  viewName: string;
  viewSql: string;
}
