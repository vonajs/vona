import { EntityBase, TableIdentity } from 'vona';

export interface EntityRoleFieldsRight extends EntityBase {
  roleId: number;
  roleAtomId: TableIdentity;
  atomClassId: number;
  fieldsRight: string;
}
