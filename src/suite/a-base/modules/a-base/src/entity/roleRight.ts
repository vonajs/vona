import { EntityBase } from '@cabloy/core';

export interface EntityRoleRight extends EntityBase {
  roleId: number;
  atomClassId: number;
  action: number;
  scope: string;
  roleAtomId: number;
}
