import { BeanBase } from 'vona';
import { IPassportAdapter, IUserBase } from 'vona-module-a-user';
import { Service } from 'vona-module-a-web';
import { IUser } from '../types/user.js';

const __UsersDemo = [{ id: 1, name: 'admin', avatar: undefined, locale: undefined }];
@Service()
export class ServicePassportAdapter extends BeanBase implements IPassportAdapter {
  async createUserAnonymous(): Promise<IUserBase> {
    const user: IUser = { id: -1, name: 'anonymous', avatar: undefined, locale: undefined };
    return user;
  }

  async getUserMock(name?: string): Promise<IUserBase | undefined> {
    return this.getUser({ name: name ?? 'admin' });
  }

  async getUser(user: Partial<IUser>): Promise<IUserBase | undefined> {
    if (user.id !== undefined) return __UsersDemo.find(item => item.id === user.id);
    if (user.name !== undefined) return __UsersDemo.find(item => item.name === user.name);
  }
}
