import { TableIdentity } from 'vona';
import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityRoleRight extends EntityBaseTemp {
  roleId: number;
  atomClassId: number;
  action: number;
  scope: string;
  roleAtomId: TableIdentity;
}
