import { TableIdentity } from 'vona-module-a-core';
import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityRoleExpand extends EntityBaseTemp {
  roleId: number;
  roleIdBase: number;
  roleAtomId: TableIdentity;
}
