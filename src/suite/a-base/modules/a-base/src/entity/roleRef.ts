import { EntityBase } from 'vona';

export interface EntityRoleRef extends EntityBase {
  roleId: number;
  roleIdParent: number;
  level: number;
}
