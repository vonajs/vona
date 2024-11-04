import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityViewRecord extends Omit<EntityBase, 'iid'> {
  viewName: string;
  viewSql: string;
}
