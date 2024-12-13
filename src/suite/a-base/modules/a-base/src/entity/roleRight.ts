import { TableIdentity } from 'vona-module-a-database';
import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aRoleRight')
export class EntityRoleRight extends EntityBaseTemp {
  roleId: number;
  atomClassId: number;
  action: number;
  scope: string;
  roleAtomId: TableIdentity;
}
