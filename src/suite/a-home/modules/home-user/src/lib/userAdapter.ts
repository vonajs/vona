import type { ILocalInfos } from 'vona';
import type { TableIdentity } from 'vona-module-a-database';
import type { IUserBase } from 'vona-module-a-user';
import type { IUser } from '../types/user.js';
import { cast } from 'vona';
import { setUserAdapter } from 'vona-module-a-user';

setUserAdapter({ userId, userName, userAvatar, userLocale, isAnonymous });

function userId(user: IUserBase): TableIdentity {
  return cast<IUser>(user).id;
}

function userName(user: IUserBase): string {
  return cast<IUser>(user).name;
}

function userAvatar(user: IUserBase): string | undefined {
  return cast<IUser>(user).avatar;
}

function userLocale(user: IUserBase): keyof ILocalInfos | undefined {
  return cast<IUser>(user).locale;
}

function isAnonymous(user: IUserBase): boolean {
  return cast<IUser>(user).id === -1;
}
