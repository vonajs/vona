import { EntityBase } from 'vona';

export interface EntityRoleIncRef extends EntityBase {
  roleId: number;
  roleIdInc: number;
  roleIdSrc: number;
}
