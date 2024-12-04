import { TableIdentity } from 'vona-module-a-database';
import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aRoleFieldsRight')
export class EntityRoleFieldsRight extends EntityBaseTemp {
  roleId: number;
  roleAtomId: TableIdentity;
  atomClassId: number;
  fieldsRight: string;
}
