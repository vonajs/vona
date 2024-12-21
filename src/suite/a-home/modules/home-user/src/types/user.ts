import { IUserBase } from 'vona-module-a-user';

export interface IUser extends IUserBase {
  id: number;
  name: string;
  avatar?: string;
  locale?: string;
}
