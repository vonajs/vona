import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aRoleIncRef')
export class EntityRoleIncRef extends EntityBaseTemp {
  roleId: number;
  roleIdInc: number;
  roleIdSrc: number;
}
