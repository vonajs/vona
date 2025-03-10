import type { ILocalInfos } from 'vona';
import type { TableIdentity } from 'vona-module-a-database';
import type { IPayloadDataBase } from 'vona-module-a-jwt';
import type { IAuthBase, IPassportBase, IUserBase } from 'vona-module-a-user';

export interface IUser extends IUserBase {
  name: string;
  avatar?: string;
  locale?: keyof ILocalInfos | undefined;
}

export interface IAuth extends IAuthBase {}

export interface IPassport extends IPassportBase {
  user?: IUser;
  auth?: IAuth;
}

export interface IPayloadData extends IPayloadDataBase {
  userId: TableIdentity;
  authId: TableIdentity;
  token?: string;
}
