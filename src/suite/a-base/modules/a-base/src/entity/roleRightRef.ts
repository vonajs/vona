import {} from '@cabloy/core';

export interface EntityRoleRightRef extends EntityBase {
  roleRightId: number;
  roleId: number;
  atomClassId: number;
  action: number;
  roleIdScope: number;
}
