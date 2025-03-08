import type { IAuthBase, IPassportAdapter, IPassportBase, IUserBase } from 'vona-module-a-user';
import type { IAuth, IPayloadData, IUser } from '../types/user.ts';
import { BeanBase, deepExtend } from 'vona';
import { Service } from 'vona-module-a-web';

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
    if (!usersDemo)
      return;
    if (user.id !== undefined)
      return usersDemo.find(item => item.id === user.id);
    if (user.name !== undefined)
      return usersDemo.find(item => item.name === user.name);
  }

  async updateUser(user: Partial<IUser>): Promise<void> {
    const usersDemo = await this._getUsersDemo();
    if (!usersDemo)
      return;
    const userDemo = usersDemo.find(item => item.id === user.id);
    if (!userDemo)
      return;
    Object.assign(userDemo, user);
    await this.scope.cacheRedis.usersDemo.set(usersDemo);
  }

  async deserializeUser(payloadData: IPayloadData): Promise<IPassportBase | undefined> {
    // verify redis token
    const verified = await this.scope.service.redisToken.verify(payloadData);
    if (!verified) return;
    const user = await this.getUser({ id: payloadData.userId });
    if (!user) return;
    const auth = await this.getAuth({ id: payloadData.authId });
    if (!auth) return;
    return { user, auth };
  }

  async getAuth(auth: Partial<IAuth>): Promise<IAuthBase | undefined> {
    return auth;
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
