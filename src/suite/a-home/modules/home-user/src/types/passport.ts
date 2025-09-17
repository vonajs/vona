import type { TableIdentity } from 'table-identity';
import type { IPayloadDataBase } from 'vona-module-a-jwt';
import type { IPassportBase, IUserBase } from 'vona-module-a-user';
import type { IAuth } from './auth.ts';

export interface IPassport extends IPassportBase {
  user?: IUserBase;
  auth?: IAuth;
}

export interface IPayloadData extends IPayloadDataBase {
  userId: TableIdentity;
  authId: TableIdentity;
  token?: string;
}
