import { EntityBase } from 'vona';

export interface EntityViewRecord extends Omit<EntityBase, 'iid'> {
  viewName: string;
  viewSql: string;
}
