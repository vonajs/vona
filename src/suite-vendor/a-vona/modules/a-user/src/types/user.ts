import type { ILocaleInfos } from 'vona';
import type { TableIdentity } from 'vona-module-a-orm';
import type { IAuthUserProfile } from './authProfile.ts';

export interface IUserNameRecord {
  admin: never;
}

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
  getUserLocale(user: IUserBase): keyof ILocaleInfos | undefined;
  getUserAnonymous(user: IUserBase): boolean;
}

export interface IUserInnerAdapter {
  createByProfile(profile: IAuthUserProfile): Promise<IUserBase>;
  createAnonymous(): Promise<IUserBase>;
  findOneByName(name: string): Promise<IUserBase | undefined>;
  findOne(user: Partial<IUserBase>): Promise<IUserBase | undefined>;
  update(user: Partial<IUserBase>): Promise<void>;
  remove(user: Partial<IUserBase>): Promise<void>;
}
