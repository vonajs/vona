import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aRoleRightRef')
export class EntityRoleRightRef extends EntityBaseTemp {
  roleRightId: number;
  roleId: number;
  atomClassId: number;
  action: number;
  roleIdScope: number;
}
