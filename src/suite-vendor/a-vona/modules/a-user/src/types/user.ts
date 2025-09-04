import type { TableIdentity } from 'table-identity';
import type { ILocaleInfos } from 'vona';
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
  getUserEmail(user: IUserBase): string | undefined;
  getUserMobile(user: IUserBase): string | undefined;
  getUserActivated(user: IUserBase): boolean;
  getUserLocale(user: IUserBase): keyof ILocaleInfos | undefined;
  getUserAnonymous(user: IUserBase): boolean;
}

export interface IUserInnerAdapter {
  create(user: Partial<IUserBase>): Promise<IUserBase>;
  userOfProfile(profile: IAuthUserProfile): Promise<IUserBase>;
  createAnonymous(): Promise<IUserBase>;
  findOneByName(name: string): Promise<IUserBase | undefined>;
  findOne(user: Partial<IUserBase>): Promise<IUserBase | undefined>;
  update(user: Partial<IUserBase>): Promise<void>;
  remove(user: Partial<IUserBase>): Promise<void>;
  setActivated(id: TableIdentity, activated: boolean): Promise<void>;
}
