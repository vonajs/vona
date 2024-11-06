import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aRoleRef')
export class EntityRoleRef extends EntityBaseTemp {
  roleId: number;
  roleIdParent: number;
  level: number;
}
