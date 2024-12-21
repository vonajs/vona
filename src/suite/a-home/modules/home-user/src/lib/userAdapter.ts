import { cast, ILocalInfos } from 'vona';
import { TableIdentity } from 'vona-module-a-database';
import { IUserBase, setUserAdapter } from 'vona-module-a-user';
import { IUser } from '../types/user.js';

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
