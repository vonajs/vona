import { TableIdentity } from 'vona-module-a-core';
import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aResourceRole')
export class EntityResourceRole extends EntityItemBase {
  roleId: number;
  roleAtomId: TableIdentity;
}
