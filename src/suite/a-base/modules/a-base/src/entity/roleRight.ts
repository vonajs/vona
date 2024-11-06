import { TableIdentity } from 'vona-module-a-core';
import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aRoleRight')
export class EntityRoleRight extends EntityBaseTemp {
  roleId: number;
  atomClassId: number;
  action: number;
  scope: string;
  roleAtomId: TableIdentity;
}
