import type { ILocalInfos } from 'vona';
import type { TableIdentity } from 'vona-module-a-database';
import type { IUserBase } from 'vona-module-a-user';
import type { IUser } from '../types/user.ts';
import { cast } from 'vona';
import { setUserAdapter } from 'vona-module-a-user';

setUserAdapter({ getUserId, getUserName, getUserAvatar, getUserLocale, getUserAnonymous });

function getUserId(user: IUserBase): TableIdentity {
  return cast<IUser>(user).id;
}

function getUserName(user: IUserBase): string {
  return cast<IUser>(user).name;
}

function getUserAvatar(user: IUserBase): string | undefined {
  return cast<IUser>(user).avatar;
}

function getUserLocale(user: IUserBase): keyof ILocalInfos | undefined {
  return cast<IUser>(user).locale;
}

function getUserAnonymous(user: IUserBase): boolean {
  return cast<IUser>(user).id === -1;
}
