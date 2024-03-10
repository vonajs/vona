import {} from '@cabloy/core';

export interface EntityViewRecord extends Omit<EntityBase, 'iid'> {
  viewName: string;
  viewSql: string;
}
