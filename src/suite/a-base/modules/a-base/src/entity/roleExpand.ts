import { TableIdentity } from 'vona';
import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityRoleExpand extends EntityBaseTemp {
  roleId: number;
  roleIdBase: number;
  roleAtomId: TableIdentity;
}
