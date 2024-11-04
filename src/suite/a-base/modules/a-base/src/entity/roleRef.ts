import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityRoleRef extends EntityBaseTemp {
  roleId: number;
  roleIdParent: number;
  level: number;
}
