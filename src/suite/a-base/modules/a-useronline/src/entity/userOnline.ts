import { EntityItemBase } from 'vona-module-a-base';

export interface EntityUserOnline extends EntityItemBase {
  userId: number;
  loginCount: number;
  loginIPLast: string;
  loginTimeLast: Date;
  onlineCount: number;
  onlineIPLast: string;
  onlineTimeLast: Date;
  expireTime: Date;
}
