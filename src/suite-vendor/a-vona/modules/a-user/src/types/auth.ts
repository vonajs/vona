import type { TableIdentity } from 'vona-module-a-database';

export interface IAuthIdRecord {
  '-1': 'dev';
  '-10000': 'mock';
}

export interface IAuthBase {
  id: TableIdentity;
}

export interface IAuthAdapter {
  getAuthId(user: IAuthBase): TableIdentity;
}

export type TypeAuthToken = 'recreate' | 'refresh' | 'nochange';

export interface ISigninOptions {
  /** default: refresh */
  authToken?: TypeAuthToken;
}

export interface IAuthInnerAdapter {
  get(auth: Partial<IAuthBase>): Promise<IAuthBase | undefined>;
}
