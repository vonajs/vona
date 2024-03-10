import { EntityItemBase } from '@cabloy/core';

export interface EntityAuthOpen extends EntityItemBase {
  description: string;
  userId: number;
  scopeRoleId: number;
  neverExpire: number;
  expireTime: Date;
  clientID: string;
  clientSecret: string;
  clientSecretHidden: number;
}
