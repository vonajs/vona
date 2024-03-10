import { EntityItemBase } from '@cabloy/core';

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
