import type { ILocalInfos } from 'vona';
import type { IAuthBase, IPassportBase, IPayloadDataBase, IUserBase } from 'vona-module-a-user';

export interface IUser extends IUserBase {
  id: number;
  name: string;
  avatar?: string;
  locale?: keyof ILocalInfos | undefined;
}

export interface IAuth extends IAuthBase {
  id: number;
}

export interface IPassport extends IPassportBase {
  user?: IUser;
  auth?: IAuth;
}

export interface IPayloadData extends IPayloadDataBase {
  userId: number;
  authId: number;
  token?: string;
}
