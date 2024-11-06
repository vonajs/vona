import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aRole')
export class EntityRole extends EntityItemBase {
  roleName: string;
  leader: number;
  catalog: number;
  system: number;
  sorting: number;
  roleIdParent: number;
  description: string;
  roleTypeCode: number;
  roleConfig: string;
}
