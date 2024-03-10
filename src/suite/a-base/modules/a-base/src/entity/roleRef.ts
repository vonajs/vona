import {} from '@cabloy/core';

export interface EntityRoleRef extends EntityBase {
  roleId: number;
  roleIdParent: number;
  level: number;
}
