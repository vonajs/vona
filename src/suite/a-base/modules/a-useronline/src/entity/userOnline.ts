import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aUserOnline')
export class EntityUserOnline extends EntityItemBase {
  userId: number;
  loginCount: number;
  loginIPLast: string;
  loginTimeLast: Date;
  onlineCount: number;
  onlineIPLast: string;
  onlineTimeLast: Date;
  expireTime: Date;
}
