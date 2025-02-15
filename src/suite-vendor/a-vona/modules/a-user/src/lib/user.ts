import type { ILocalInfos } from 'vona';
import type { TableIdentity } from 'vona-module-a-database';
import type { IUserAdapter, IUserBase } from '../types/user.js';

let __userAdapter: IUserAdapter;

export function setUserAdapter(userAdapter: IUserAdapter): void {
  __userAdapter = userAdapter;
}

export function userId(user: IUserBase): TableIdentity {
  return __userAdapter.userId(user);
}

export function userName(user: IUserBase): string {
  return __userAdapter.userName(user);
}

export function userAvatar(user: IUserBase): string | undefined {
  return __userAdapter.userAvatar(user);
}

export function userLocale(user: IUserBase): keyof ILocalInfos | undefined {
  return __userAdapter.userLocale(user);
}

export function isAnonymous(user: IUserBase): boolean {
  return __userAdapter.isAnonymous(user);
}
