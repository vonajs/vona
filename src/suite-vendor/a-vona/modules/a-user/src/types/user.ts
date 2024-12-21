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

declare module 'vona' {
  export interface ContextState {
    user?: IUserBase;
  }
}
