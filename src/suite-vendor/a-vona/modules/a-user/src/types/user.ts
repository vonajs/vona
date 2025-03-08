import type { ILocalInfos } from 'vona';
import type { TableIdentity } from 'vona-module-a-database';

export interface IUserBase {}

export interface IAuthBase {}

export interface IPassportBase {
  user?: IUserBase;
  auth?: IAuthBase;
}

export interface IPayloadDataBase {}

export interface IUserAdapter {
  userId(user: IUserBase): TableIdentity;
  userName (user: IUserBase): string;
  userAvatar (user: IUserBase): string | undefined;
  userLocale(user: IUserBase): keyof ILocalInfos | undefined;
  isAnonymous(user: IUserBase): boolean;
}

export interface IPassportAdapter {
  createUserAnonymous(): Promise<IUserBase>;
  getUserMock(name?: string): Promise<IUserBase | undefined>;
  getUser(user: Partial<IUserBase>): Promise<IUserBase | undefined>;
  updateUser(user: Partial<IUserBase>): Promise<void>;
  deserializeUser(data: IPayloadDataBase): Promise<IPassportBase | undefined>;
  getAuth(auth: Partial<IAuthBase>): Promise<IAuthBase | undefined>;
}

declare module 'vona' {
  export interface ContextState {
    passport?: IPassportBase;
  }
}
