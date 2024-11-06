import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aRoleInc')
export class EntityRoleInc extends EntityBaseTemp {
  roleId: number;
  roleIdInc: number;
}
