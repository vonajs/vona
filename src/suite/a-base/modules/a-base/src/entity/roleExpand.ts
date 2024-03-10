import { EntityBase, TableIdentity } from '@cabloy/core';

export interface EntityRoleExpand extends EntityBase {
  roleId: number;
  roleIdBase: number;
  roleAtomId: TableIdentity;
}
