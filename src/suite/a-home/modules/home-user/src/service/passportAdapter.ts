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
    const usersDemo = await this._getUsersDemo();
    if (!usersDemo) return;
    if (user.id !== undefined) return usersDemo.find(item => item.id === user.id);
    if (user.name !== undefined) return usersDemo.find(item => item.name === user.name);
  }

  async updateUser(user: Partial<IUser>): Promise<void> {
    const usersDemo = await this._getUsersDemo();
    if (!usersDemo) return;
    const userDemo = usersDemo.find(item => item.id === user.id);
    if (!userDemo) return;
    Object.assign(userDemo, user);
    const redis = this.bean.redis.get('cache');
    const key = this._getCacheKey('usersDemo');
    await redis.set(key, JSON.stringify(usersDemo));
  }

  private async _getUsersDemo() {
    if (this.app.meta.isProd) return;
    const redis = this.bean.redis.get('cache');
    const key = this._getCacheKey('usersDemo');
    const usersDemo = await redis.get(key);
    if (usersDemo) return JSON.parse(usersDemo);
    await redis.set(key, JSON.stringify(__UsersDemo));
    return __UsersDemo;
  }

  private _getCacheKey(name: string) {
    return `${this.ctx.instance ? this.ctx.instance.id : 0}:home-user:${name}`;
  }
}
