import { TableIdentity } from 'vona';
import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityRoleFieldsRight extends EntityBaseTemp {
  roleId: number;
  roleAtomId: TableIdentity;
  atomClassId: number;
  fieldsRight: string;
}
