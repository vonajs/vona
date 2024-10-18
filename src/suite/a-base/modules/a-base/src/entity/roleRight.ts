import { EntityBase, TableIdentity } from 'vona';

export interface EntityRoleRight extends EntityBase {
  roleId: number;
  atomClassId: number;
  action: number;
  scope: string;
  roleAtomId: TableIdentity;
}
