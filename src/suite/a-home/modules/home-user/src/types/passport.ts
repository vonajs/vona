import type { TableIdentity } from 'table-identity';
import type { IPayloadDataBase } from 'vona-module-a-jwt';
import type { IAuthBase, IPassportBase, IUserBase } from 'vona-module-a-user';

export interface IPassport extends IPassportBase {
  user?: IUserBase;
  auth?: IAuthBase;
}

export interface IPayloadData extends IPayloadDataBase {
  userId: TableIdentity;
  authId: TableIdentity;
  token?: string;
}
