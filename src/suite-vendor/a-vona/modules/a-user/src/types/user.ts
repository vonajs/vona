import type { ILocalInfos } from 'vona';
import type { TableIdentity } from 'vona-module-a-database';

export interface IUserIdRecord {
  '-1': 'anonymous';
}

export interface IUserBase {
  id: TableIdentity;
}

export interface IUserAdapter {
  getUserId(user: IUserBase): TableIdentity;
  getUserName (user: IUserBase): string;
  getUserAvatar (user: IUserBase): string | undefined;
  getUserLocale(user: IUserBase): keyof ILocalInfos | undefined;
  getUserAnonymous(user: IUserBase): boolean;
}
