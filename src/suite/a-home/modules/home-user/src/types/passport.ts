import type { TableIdentity } from 'table-identity';
import type { IPayloadDataBase } from 'vona-module-a-jwt';

export interface IPayloadData extends IPayloadDataBase {
  userId: TableIdentity;
  authId: TableIdentity;
  token?: string;
}
