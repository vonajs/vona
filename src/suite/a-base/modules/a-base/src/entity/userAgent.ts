import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aUserAgent')
export class EntityUserAgent extends EntityBaseTemp {
  userId: number;
  userIdAgent: number;
}
