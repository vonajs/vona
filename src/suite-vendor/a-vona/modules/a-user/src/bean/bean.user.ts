import type { IAuthUserProfile } from '../types/authProfile.ts';
import type { IUserBase, IUserInnerAdapter } from '../types/user.ts';
import { BeanBase, beanFullNameFromOnionName } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanUser extends BeanBase {
  private _userInnerAdapter: IUserInnerAdapter;

  private get userInnerAdapter(): IUserInnerAdapter {
    if (!this._userInnerAdapter) {
      const beanFullName = beanFullNameFromOnionName(this.scope.config.adapter.userInner, 'service');
      this._userInnerAdapter = this.bean._getBean<IUserInnerAdapter>(beanFullName as never);
    }
    return this._userInnerAdapter;
  }

  async activate(user: IUserBase) {
    await this.scope.event.activate.emit(user, async user => {
      await this.userInnerAdapter.setActivated(user.id, true);
    });
  }

  async register(user: Partial<IUserBase>, confirmed?: boolean): Promise<IUserBase> {
    // config.user.autoActivate > confirmed
    const autoActivate = this.scope.config.user.autoActivate ? true : confirmed;
    const data = { user, confirmed, autoActivate };
    return await this.scope.event.register.emit(data, async data => {
      // user
      const userNew = await this.userInnerAdapter.create(data.user);
      if (data.autoActivate) {
        await this.activate(userNew);
      }
      return userNew;
    }) as IUserBase;
  }

  async registerByProfile(profile: IAuthUserProfile): Promise<IUserBase> {
    const user = await this.userInnerAdapter.userOfProfile(profile);
    return await this.register(user, profile.confirmed);
  }

  createAnonymous(): Promise<IUserBase> {
    return this.userInnerAdapter.createAnonymous();
  }

  findOneByName(name: string): Promise<IUserBase | undefined> {
    return this.userInnerAdapter.findOneByName(name);
  }

  findOne(user: Partial<IUserBase>): Promise<IUserBase | undefined> {
    return this.userInnerAdapter.findOne(user);
  }

  update(user: Partial<IUserBase>): Promise<void> {
    return this.userInnerAdapter.update(user);
  }

  remove(user: Partial<IUserBase>): Promise<void> {
    return this.userInnerAdapter.remove(user);
  }
}
