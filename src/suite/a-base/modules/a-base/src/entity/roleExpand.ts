import { TableIdentity } from 'vona-module-a-database';
import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aRoleExpand')
export class EntityRoleExpand extends EntityBaseTemp {
  roleId: number;
  roleIdBase: number;
  roleAtomId: TableIdentity;
}
