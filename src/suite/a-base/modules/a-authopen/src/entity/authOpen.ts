import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aAuthOpen')
export class EntityAuthOpen extends EntityItemBase {
  description: string;
  userId: number;
  scopeRoleId: number;
  neverExpire: number;
  expireTime: Date;
  clientID: string;
  clientSecret: string;
  clientSecretHidden: number;
}
