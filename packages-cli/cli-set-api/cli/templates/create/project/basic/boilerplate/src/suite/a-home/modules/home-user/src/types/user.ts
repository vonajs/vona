import type { ILocaleInfos } from 'vona';
import type { IUserBase } from 'vona-module-a-user';

export interface IUser extends IUserBase {
  name: string;
  avatar?: string;
  email?: string;
  mobile?: string;
  activated: boolean;
  locale?: keyof ILocaleInfos | undefined;
}
