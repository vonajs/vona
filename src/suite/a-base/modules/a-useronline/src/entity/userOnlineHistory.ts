import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityUserOnlineHistory extends EntityBaseTemp {
  userId: number;
  onlineIP: string;
  onlineTime: Date;
  isLogin: number;
}
