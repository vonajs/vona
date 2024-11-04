import { TableIdentity } from 'vona-module-a-core';
import { EntityItemBase } from 'vona-module-a-base';

export interface EntityResourceRole extends EntityItemBase {
  roleId: number;
  roleAtomId: TableIdentity;
}
