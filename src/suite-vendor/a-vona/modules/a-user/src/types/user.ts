import type { ILocalInfos } from 'vona';
import type { TableIdentity } from 'vona-module-a-database';
import type { IPayloadDataBase } from 'vona-module-a-jwt';

export interface IUserBase {
  id: TableIdentity;
}

export interface IAuthBase {
  id: TableIdentity;
}

export interface IPassportBase {
  user?: IUserBase;
  auth?: IAuthBase;
}

export interface IUserAdapter {
  getUserId(user: IUserBase): TableIdentity;
  getUserName (user: IUserBase): string;
  getUserAvatar (user: IUserBase): string | undefined;
  getUserLocale(user: IUserBase): keyof ILocalInfos | undefined;
  getUserAnonymous(user: IUserBase): boolean;
}

export interface IPassportAdapter {
  createUserAnonymous(): Promise<IUserBase>;
  getUserMock(name?: string): Promise<IUserBase | undefined>;
  getUser(user: Partial<IUserBase>): Promise<IUserBase | undefined>;
  updateUser(user: Partial<IUserBase>): Promise<void>;
  getAuth(auth: Partial<IAuthBase>): Promise<IAuthBase | undefined>;
  serializePassport(passport: IPassportBase): Promise<IPayloadDataBase>;
  deserializePassport(data: IPayloadDataBase): Promise<IPassportBase | undefined>;
  removePassport(passport: IPassportBase): Promise<void>;
}

declare module 'vona' {
  export interface ContextState {
    passport?: IPassportBase;
  }
}
