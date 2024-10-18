import { EntityBase } from 'vona';

export interface EntityUserOnlineHistory extends EntityBase {
  userId: number;
  onlineIP: string;
  onlineTime: Date;
  isLogin: number;
}
