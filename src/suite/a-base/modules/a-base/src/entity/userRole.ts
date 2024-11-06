import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aUserRole')
export class EntityUserRole extends EntityBaseTemp {
  userId: number;
  roleId: number;
}
