import { EntityBase, TableIdentity } from 'vona';

export interface EntityRoleExpand extends EntityBase {
  roleId: number;
  roleIdBase: number;
  roleAtomId: TableIdentity;
}
