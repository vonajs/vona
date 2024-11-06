import { TableIdentity } from 'vona-module-a-core';
import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aRoleExpand')
export class EntityRoleExpand extends EntityBaseTemp {
  roleId: number;
  roleIdBase: number;
  roleAtomId: TableIdentity;
}
