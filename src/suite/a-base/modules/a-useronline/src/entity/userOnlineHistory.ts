import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aUserOnlineHistory')
export class EntityUserOnlineHistory extends EntityBaseTemp {
  userId: number;
  onlineIP: string;
  onlineTime: Date;
  isLogin: number;
}
