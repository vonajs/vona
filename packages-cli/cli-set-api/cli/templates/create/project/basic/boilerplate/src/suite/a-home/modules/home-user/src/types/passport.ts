import type { TableIdentity } from 'table-identity';
import type { IPayloadDataBase } from 'vona-module-a-jwt';
import type { IPassportBase } from 'vona-module-a-user';

export interface IPayloadData extends IPayloadDataBase {
  userId: TableIdentity;
  authId: TableIdentity;
  token?: string;
}

export interface IPassport extends IPassportBase {}
