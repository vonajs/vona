import type { ILocalInfos } from 'vona';
import type { TableIdentity } from 'vona-module-a-database';
import type { IUserAdapter, IUserBase } from '../types/user.ts';

let __userAdapter: IUserAdapter;

export function setUserAdapter(userAdapter: IUserAdapter): void {
  __userAdapter = userAdapter;
}

export function getUserId(user: IUserBase): TableIdentity {
  return __userAdapter.getUserId(user);
}

export function getUserName(user: IUserBase): string {
  return __userAdapter.getUserName(user);
}

export function getUserAvatar(user: IUserBase): string | undefined {
  return __userAdapter.getUserAvatar(user);
}

export function getUserLocale(user: IUserBase): keyof ILocalInfos | undefined {
  return __userAdapter.getUserLocale(user);
}

export function getUserAnonymous(user: IUserBase): boolean {
  return __userAdapter.getUserAnonymous(user);
}
