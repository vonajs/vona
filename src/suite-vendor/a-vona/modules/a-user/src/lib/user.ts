import { TableIdentity } from 'vona-module-a-database';
import { IUserBase } from '../types/user.js';
import { ILocalInfos } from 'vona';

export function userId(user: IUserBase): TableIdentity {
  throw new Error('userId not implemented.');
}

export function userName(user: IUserBase): string {
  throw new Error('userName not implemented.');
}

export function userAvatar(user: IUserBase): string | undefined {
  throw new Error('userAvatar not implemented.');
}

export function userLocale(user: IUserBase): keyof ILocalInfos | undefined {
  throw new Error('userAvatar not implemented.');
}

export function isAnonymous(user: IUserBase): boolean {
  throw new Error('isAuthenticated not implemented.');
}
