import type { IUserBase, IUserInnerAdapter } from 'vona-module-a-user';
import type { IUser } from '../types/user.ts';
import { BeanBase, deepExtend } from 'vona';
import { Service } from 'vona-module-a-web';

const __UsersDemo = [{ id: 1, name: 'admin', avatar: undefined, locale: undefined }];

@Service()
export class ServiceUserInnerAdapter extends BeanBase implements IUserInnerAdapter {
  async createAnonymous(): Promise<IUserBase> {
    const user: IUser = { id: -1, name: 'anonymous', avatar: undefined, locale: undefined };
    return user;
  }

  async getByName(name: string): Promise<IUserBase | undefined> {
    return this.get({ name });
  }

  async get(user: Partial<IUser>): Promise<IUserBase | undefined> {
    const usersDemo = await this._getUsersDemo();
    if (!usersDemo)
      return;
    if (user.id !== undefined)
      return usersDemo.find(item => item.id === user.id);
    if (user.name !== undefined)
      return usersDemo.find(item => item.name === user.name);
  }

  async update(user: Partial<IUser>): Promise<void> {
    const usersDemo = await this._getUsersDemo();
    if (!usersDemo)
      return;
    const userDemo = usersDemo.find(item => item.id === user.id);
    if (!userDemo)
      return;
    Object.assign(userDemo, user);
    await this.scope.cacheRedis.usersDemo.set(usersDemo);
  }

  private async _getUsersDemo() {
    if (this.app.meta.isProd)
      return;
    let usersDemo = await this.scope.cacheRedis.usersDemo.get();
    if (!usersDemo) {
      usersDemo = deepExtend([], __UsersDemo);
      await this.scope.cacheRedis.usersDemo.set(usersDemo);
    }
    return usersDemo;
  }
}
