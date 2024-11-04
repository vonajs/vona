import { EntityItemBase } from 'vona-module-a-base';

export interface EntityRole extends EntityItemBase {
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
