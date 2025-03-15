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

  createByProfile(profile: IAuthUserProfile): Promise<IUserBase> {
    return this.userInnerAdapter.createByProfile(profile);
  }

  createAnonymous(): Promise<IUserBase> {
    return this.userInnerAdapter.createAnonymous();
  }

  getByName(name: string): Promise<IUserBase | undefined> {
    return this.userInnerAdapter.getByName(name);
  }

  get(user: Partial<IUserBase>): Promise<IUserBase | undefined> {
    return this.userInnerAdapter.get(user);
  }

  update(user: Partial<IUserBase>): Promise<void> {
    return this.userInnerAdapter.update(user);
  }
}
