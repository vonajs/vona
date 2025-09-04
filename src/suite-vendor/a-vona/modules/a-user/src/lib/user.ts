import type { ILocaleInfos } from 'vona';
import type { TableIdentity } from 'vona-module-a-orm';
import type { IUserAdapter, IUserBase, IUserIdRecord } from '../types/user.ts';

let __userAdapter: IUserAdapter;

export function setUserAdapter(userAdapter: IUserAdapter): void {
  __userAdapter = userAdapter;
}

export function $getUserId(user: IUserBase): TableIdentity {
  return __userAdapter.getUserId(user);
}

export function $getUserName(user: IUserBase): string {
  return __userAdapter.getUserName(user);
}

export function $getUserAvatar(user: IUserBase): string | undefined {
  return __userAdapter.getUserAvatar(user);
}

export function $getUserEmail(user: IUserBase): string | undefined {
  return __userAdapter.getUserEmail(user);
}

export function $getUserMobile(user: IUserBase): string | undefined {
  return __userAdapter.getUserMobile(user);
}

export function $getUserActivated(user: IUserBase): boolean {
  return __userAdapter.getUserActivated(user);
}

export function $getUserLocale(user: IUserBase): keyof ILocaleInfos | undefined {
  return __userAdapter.getUserLocale(user);
}

export function $getUserAnonymous(user: IUserBase): boolean {
  return __userAdapter.getUserAnonymous(user);
}

export function $getUserIdSystem<K extends keyof IUserIdRecord>(_userName: IUserIdRecord[K], userId: K): TableIdentity {
  return userId;
}
