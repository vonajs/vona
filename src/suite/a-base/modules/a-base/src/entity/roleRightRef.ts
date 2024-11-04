import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityRoleRightRef extends EntityBaseTemp {
  roleRightId: number;
  roleId: number;
  atomClassId: number;
  action: number;
  roleIdScope: number;
}
