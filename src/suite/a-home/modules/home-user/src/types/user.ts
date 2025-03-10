import type { ILocalInfos } from 'vona';
import type { IUserBase } from 'vona-module-a-user';

export interface IUser extends IUserBase {
  name: string;
  avatar?: string;
  locale?: keyof ILocalInfos | undefined;
}
