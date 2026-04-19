import type { TableIdentity } from 'table-identity';
import type { IAuthProviderRecord } from 'vona-module-a-auth';

export interface IAuthIdRecord {
  '-1': 'dev';
  '-10000': 'mock';
}

export interface IAuthProvider {
  id: TableIdentity;
  providerName: keyof IAuthProviderRecord;
  clientName: string;
}

export interface IAuth {
  id: TableIdentity;
  profileId?: string;
  authProvider?: IAuthProvider;
}

export type AuthTokenStrategy = 'reissue' | 'refresh' | 'reuse';

export interface ISigninOptions {
  /** default: refresh */
  authTokenStrategy?: AuthTokenStrategy;
}
