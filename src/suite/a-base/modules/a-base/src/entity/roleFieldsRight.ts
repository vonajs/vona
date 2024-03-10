import { EntityBase, TableIdentity } from '@cabloy/core';

export interface EntityRoleFieldsRight extends EntityBase {
  roleId: number;
  roleAtomId: TableIdentity;
  atomClassId: number;
  fieldsRight: string;
}
