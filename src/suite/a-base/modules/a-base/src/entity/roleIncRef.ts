import { EntityBase } from '@cabloy/core';

export interface EntityRoleIncRef extends EntityBase {
  roleId: number;
  roleIdInc: number;
  roleIdSrc: number;
}
