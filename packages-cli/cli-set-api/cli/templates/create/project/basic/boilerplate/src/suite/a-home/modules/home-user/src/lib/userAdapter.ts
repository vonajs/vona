import type { TableIdentity } from 'table-identity';
import type { ILocaleInfos } from 'vona';
import type { IUserBase } from 'vona-module-a-user';
import type { IUser } from '../types/user.ts';
import { cast } from 'vona';
import { setUserAdapter } from 'vona-module-a-user';

setUserAdapter({ getUserId, getUserName, getUserAvatar, getUserEmail, getUserMobile, getUserActivated, getUserLocale, getUserAnonymous });

function getUserId(user: IUserBase): TableIdentity {
  return cast<IUser>(user).id;
}

function getUserName(user: IUserBase): string {
  return cast<IUser>(user).name;
}

function getUserAvatar(user: IUserBase): string | undefined {
  return cast<IUser>(user).avatar;
}

function getUserEmail(user: IUserBase): string | undefined {
  return cast<IUser>(user).email;
}

function getUserMobile(user: IUserBase): string | undefined {
  return cast<IUser>(user).mobile;
}

function getUserActivated(user: IUserBase): boolean {
  return cast<IUser>(user).activated;
}

function getUserLocale(user: IUserBase): keyof ILocaleInfos | undefined {
  return cast<IUser>(user).locale;
}

function getUserAnonymous(user: IUserBase): boolean {
  return cast<IUser>(user).id === -1;
}
