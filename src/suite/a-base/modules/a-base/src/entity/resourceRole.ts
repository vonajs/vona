import { TableIdentity } from 'vona';
import { EntityItemBase } from 'vona-module-a-base';

export interface EntityResourceRole extends EntityItemBase {
  roleId: number;
  roleAtomId: TableIdentity;
}
