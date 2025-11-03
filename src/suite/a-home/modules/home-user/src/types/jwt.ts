import type { TableIdentity } from 'table-identity';

export interface IPayloadDataCustom {
  userId: TableIdentity;
  authId: TableIdentity;
  token?: string;
}

declare module 'vona-module-a-jwt' {
  export interface IPayloadData extends IPayloadDataCustom {}
}
