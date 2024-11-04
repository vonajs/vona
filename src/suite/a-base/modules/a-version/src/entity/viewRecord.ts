import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityViewRecord extends Omit<EntityBaseTemp, 'iid'> {
  viewName: string;
  viewSql: string;
}
