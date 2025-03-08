import type { ILocalInfos } from 'vona';
import type { IPayloadDataBase, IUserBase } from 'vona-module-a-user';

export interface IUser extends IUserBase {
  id: number;
  name: string;
  avatar?: string;
  locale?: keyof ILocalInfos | undefined;
}

export interface IPayloadData extends IPayloadDataBase {
  userId: number;
  token: string;
}
