import { ILocalInfos } from 'vona';
import { TableIdentity } from 'vona-module-a-database';

export interface IUserBase {}

export interface IUserAdapter {
  userId: (user: IUserBase) => TableIdentity;
  userName: (user: IUserBase) => string;
  userAvatar: (user: IUserBase) => string | undefined;
  userLocale: (user: IUserBase) => keyof ILocalInfos | undefined;
  isAnonymous: (user: IUserBase) => boolean;
}

export interface IPassportAdapter {
  createUserAnonymous(): Promise<IUserBase>;
  getUserMock(name?: string): Promise<IUserBase | undefined>;
  getUser(user: Partial<IUserBase>): Promise<IUserBase | undefined>;
}

declare module 'vona' {
  export interface ContextState {
    user?: IUserBase;
  }
}
