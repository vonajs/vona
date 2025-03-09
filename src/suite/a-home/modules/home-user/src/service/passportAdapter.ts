import type { IAuthBase, IPassportAdapter, IPassportBase, IUserBase } from 'vona-module-a-user';
import type { IAuth, IPassport, IPayloadData, IUser } from '../types/user.ts';
import { BeanBase, deepExtend, uuidv4 } from 'vona';
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

  async getAuth(auth: Partial<IAuth>): Promise<IAuthBase | undefined> {
    // todo: check if getBean of bean.auth
    return auth;
  }

  async serializePassport(passport: IPassport): Promise<IPayloadData> {
    const userId = passport.user!.id;
    const authId = passport.auth!.id;
    const token = uuidv4();
    const payloadData: IPayloadData = { userId, authId, token };
    // save redis token
    await this.scope.service.redisToken.save(payloadData);
    return payloadData;
  }

  async deserializePassport(payloadData: IPayloadData): Promise<IPassportBase | undefined> {
    // verify redis token
    const verified = await this.scope.service.redisToken.verify(payloadData);
    if (!verified) return;
    const user = await this.getUser({ id: payloadData.userId });
    if (!user) return;
    const auth = await this.getAuth({ id: payloadData.authId });
    if (!auth) return;
    return { user, auth };
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
