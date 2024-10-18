import { EntityItemBase, TableIdentity } from 'vona';

export interface EntityResourceRole extends EntityItemBase {
  roleId: number;
  roleAtomId: TableIdentity;
}
