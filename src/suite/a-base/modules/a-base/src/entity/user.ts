import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aUser')
export class EntityUser extends EntityItemBase {
  disabled: number;
  userName: string;
  realName: string;
  email: string;
  mobile: string;
  avatar: string;
  motto: string;
  locale: string;
  anonymous: number;
  activated: number;
  emailConfirmed: number;
  mobileVerified: number;
  allowChangeUserName: number;
  lastTimeChangeUserName: Date;
  idCard: string;
  address: string;
}
