import type { TableIdentity } from 'table-identity';
import type { IAuthProviderRecord } from 'vona-module-a-auth';

export interface IAuthIdRecord {
  '-1': 'dev';
  '-10000': 'mock';
}

export interface IAuthProviderBase {
  id: TableIdentity;
  providerName: keyof IAuthProviderRecord;
  clientName: string;
}

export interface IAuthBase {
  id: TableIdentity;
  profileId?: string;
  authProvider?: IAuthProviderBase;
}

export type TypeAuthToken = 'recreate' | 'refresh' | 'nochange';

export interface ISigninOptions {
  /** default: refresh */
  authToken?: TypeAuthToken;
}

export interface IAuthInnerAdapter {
  findOne(auth: Partial<IAuthBase>): Promise<IAuthBase | undefined>;
}
