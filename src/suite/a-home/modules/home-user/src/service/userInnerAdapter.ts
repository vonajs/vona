import type { IAuthUserProfile, IUserBase, IUserInnerAdapter } from 'vona-module-a-user';
import type { IUser } from '../types/user.ts';
import { BeanBase, deepExtend } from 'vona';
import { TableIdentity } from 'vona-module-a-database';
import { Service } from 'vona-module-a-web';

const __UsersDemo = [{ id: 1, name: 'admin', avatar: undefined, locale: undefined }];

@Service()
export class ServiceUserInnerAdapter extends BeanBase implements IUserInnerAdapter {
  async createByProfile(profile: IAuthUserProfile): Promise<IUserBase> {
    const usersDemo = await this._getUsersDemo();
    let id = 0;
    usersDemo.forEach(item => {
      if (Number(item.id) > id) id = Number(item.id);
    });
    const user = { id: id + 1, name: profile.username!, avatar: profile.photos?.[0].value, locale: undefined };
    usersDemo.push(user);
    await this._saveUsersDemo(usersDemo);
    return user;
  }

  async createAnonymous(): Promise<IUserBase> {
    const user: IUser = { id: -1, name: 'anonymous', avatar: undefined, locale: undefined };
    return user;
  }

  async getByName(name: string): Promise<IUserBase | undefined> {
    return this.get({ name });
  }

  async get(user: Partial<IUser>): Promise<IUserBase | undefined> {
    const usersDemo = await this._getUsersDemo();
    if (user.id !== undefined)
      return usersDemo.find(item => TableIdentity.isEqual(item.id, user.id));
    if (user.name !== undefined)
      return usersDemo.find(item => item.name === user.name);
  }

  async update(user: Partial<IUser>): Promise<void> {
    const usersDemo = await this._getUsersDemo();
    const userDemo = usersDemo.find(item => TableIdentity.isEqual(item.id, user.id));
    if (!userDemo) return;
    Object.assign(userDemo, user);
    await this.scope.cacheRedis.usersDemo.set(usersDemo);
  }

  async delete(user: Partial<IUser>): Promise<void> {
    const usersDemo = await this._getUsersDemo();
    const index = usersDemo.findIndex(item => TableIdentity.isEqual(item.id, user.id));
    if (index === -1) return;
    usersDemo.splice(index, 1);
    await this.scope.cacheRedis.usersDemo.set(usersDemo);
  }

  private async _getUsersDemo() {
    if (this.app.meta.isProd) return this.app.throw(500);
    let usersDemo = await this.scope.cacheRedis.usersDemo.get();
    if (!usersDemo) {
      usersDemo = deepExtend([], __UsersDemo);
      await this._saveUsersDemo(usersDemo);
    }
    return usersDemo;
  }

  private async _saveUsersDemo(usersDemo) {
    await this.scope.cacheRedis.usersDemo.set(usersDemo);
  }
}
