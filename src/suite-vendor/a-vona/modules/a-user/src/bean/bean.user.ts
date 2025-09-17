import type { IAuthUserProfile } from '../types/authProfile.ts';
import type { IUserAdapter, IUserBase } from '../types/user.ts';
import { BeanBase, beanFullNameFromOnionName } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanUser extends BeanBase {
  private _userInnerAdapter: IUserAdapter;

  private get userAdapter(): IUserAdapter {
    if (!this._userInnerAdapter) {
      const beanFullName = beanFullNameFromOnionName(this.scope.config.adapter.user, 'service');
      this._userInnerAdapter = this.bean._getBean<IUserAdapter>(beanFullName as never);
    }
    return this._userInnerAdapter;
  }

  async activate(user: IUserBase) {
    await this.scope.event.activate.emit(user, async user => {
      await this.userAdapter.setActivated(user.id, true);
    });
  }

  async register(user: Partial<IUserBase>, confirmed?: boolean): Promise<IUserBase> {
    // config.user.autoActivate > confirmed
    const autoActivate = this.scope.config.user.autoActivate ? true : confirmed;
    const data = { user, confirmed, autoActivate };
    return await this.scope.event.register.emit(data, async data => {
      // user
      const userNew = await this.userAdapter.create(data.user);
      if (data.autoActivate) {
        await this.activate(userNew);
      }
      return userNew;
    }) as IUserBase;
  }

  async registerByProfile(profile: IAuthUserProfile): Promise<IUserBase> {
    const user = await this.userAdapter.userOfProfile(profile);
    return await this.register(user, profile.confirmed);
  }

  createAnonymous(): Promise<IUserBase> {
    return this.userAdapter.createAnonymous();
  }

  findOneByName(name: string): Promise<IUserBase | undefined> {
    return this.userAdapter.findOneByName(name);
  }

  findOne(user: Partial<IUserBase>): Promise<IUserBase | undefined> {
    return this.userAdapter.findOne(user);
  }

  update(user: Partial<IUserBase>): Promise<void> {
    return this.userAdapter.update(user);
  }

  remove(user: Partial<IUserBase>): Promise<void> {
    return this.userAdapter.remove(user);
  }
}
