import type { IPayloadDataBase } from 'vona-module-a-jwt';
import type { TableIdentity } from 'vona-module-a-orm';
import type { IPassportBase } from 'vona-module-a-user';
import type { IAuth } from './auth.ts';
import type { IUser } from './user.ts';

export interface IPassport extends IPassportBase {
  user?: IUser;
  auth?: IAuth;
}

export interface IPayloadData extends IPayloadDataBase {
  userId: TableIdentity;
  authId: TableIdentity;
  token?: string;
}
