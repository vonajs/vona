import type { IAuthUserProfile } from '../types/authProfile.ts';
import type { IUserBase, IUserInnerAdapter } from '../types/user.ts';
import { BeanBase, beanFullNameFromOnionName } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanUserInner extends BeanBase {
  private _userInnerAdapter: IUserInnerAdapter;

  private get userInnerAdapter(): IUserInnerAdapter {
    if (!this._userInnerAdapter) {
      const beanFullName = beanFullNameFromOnionName(this.scope.config.adapter.userInner, 'service');
      this._userInnerAdapter = this.bean._getBean<IUserInnerAdapter>(beanFullName as never);
    }
    return this._userInnerAdapter;
  }

  async activate(user: IUserBase) {
    await this.scope.event.activate.emit(user, async () => {
      await this.userInnerAdapter.setActivated(user.id, true);
    });
  }

  async register(user: Partial<IUserBase>, autoActivate?: boolean): Promise<IUserBase> {
    // config.user.autoActivate > autoActivate
    autoActivate = this.scope.config.user.autoActivate ? true : autoActivate;
    const userNew = await this.userInnerAdapter.create(user);
    if (autoActivate) {
      await this.activate(userNew);
    }
    return userNew;
  }

  async registerByProfile(profile: IAuthUserProfile, autoActivate?: boolean): Promise<IUserBase> {
    const user = await this.userInnerAdapter.userOfProfile(profile);
    return await this.register(user, autoActivate);
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
