import type { ILocalInfos } from 'vona';
import type { IAuthBase, IPayloadDataBase, IUserBase } from 'vona-module-a-user';

export interface IUser extends IUserBase {
  id: number;
  name: string;
  avatar?: string;
  locale?: keyof ILocalInfos | undefined;
}

export interface IAuth extends IAuthBase {
  id: number;
}

export interface IPayloadData extends IPayloadDataBase {
  userId: number;
  authId: number;
  token: string;
}
