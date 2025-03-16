import type { ILocalInfos } from 'vona';
import type { TableIdentity } from 'vona-module-a-database';
import type { IAuthUserProfile } from './authProfile.ts';

export interface IUserIdRecord {
  '-1': 'anonymous';
}

export interface IUserBase {
  id: TableIdentity;
}

export interface IUserAdapter {
  getUserId(user: IUserBase): TableIdentity;
  getUserName(user: IUserBase): string;
  getUserAvatar(user: IUserBase): string | undefined;
  getUserLocale(user: IUserBase): keyof ILocalInfos | undefined;
  getUserAnonymous(user: IUserBase): boolean;
}

export interface IUserInnerAdapter {
  createByProfile(profile: IAuthUserProfile): Promise<IUserBase>;
  createAnonymous(): Promise<IUserBase>;
  getByName(name: string): Promise<IUserBase | undefined>;
  get(user: Partial<IUserBase>): Promise<IUserBase | undefined>;
  update(user: Partial<IUserBase>): Promise<void>;
  delete(user: Partial<IUserBase>): Promise<void>;
}
