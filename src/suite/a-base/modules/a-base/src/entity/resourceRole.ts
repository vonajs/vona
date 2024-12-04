import { TableIdentity } from 'vona-module-a-database';
import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aResourceRole')
export class EntityResourceRole extends EntityItemBase {
  roleId: number;
  roleAtomId: TableIdentity;
}
