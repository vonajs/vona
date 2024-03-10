import { EntityItemBase, TableIdentity } from '@cabloy/core';

export interface EntityResourceRole extends EntityItemBase {
  roleId: number;
  roleAtomId: TableIdentity;
}
