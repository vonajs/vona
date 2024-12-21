import { BeanBase } from 'vona';
import { IPassportAdapter, IUserBase } from 'vona-module-a-user';
import { Service } from 'vona-module-a-web';
import { IUser } from '../types/user.js';

@Service()
export class ServicePassportAdapter extends BeanBase implements IPassportAdapter {
  async createUserAnonymous(): Promise<IUserBase> {
    const user: IUser = { id: -1, name: 'anonymous', avatar: undefined, locale: undefined };
    return user;
  }

  async getUserMock(name?: string): Promise<IUserBase> {
    if (!name) name = 'admin';
    const user: IUser = { id: 1, name, avatar: undefined, locale: undefined };
    return user;
  }
}
