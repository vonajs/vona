import { EntityBase } from 'vona';

export interface EntityUserRole extends EntityBase {
  userId: number;
  roleId: number;
}
