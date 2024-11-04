import { EntityItemBase } from 'vona-module-a-base';

export interface EntityUser extends EntityItemBase {
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
