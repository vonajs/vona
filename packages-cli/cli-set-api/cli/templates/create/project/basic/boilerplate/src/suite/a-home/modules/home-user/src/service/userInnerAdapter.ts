import type { IAuthUserProfile, IUserBase, IUserInnerAdapter } from 'vona-module-a-user';
import type { IUser } from '../types/user.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceUserInnerAdapter extends BeanBase implements IUserInnerAdapter {
  async createByProfile(profile: IAuthUserProfile): Promise<IUserBase> {
    return await this.scope.model.user.insert({
      name: profile.username!,
      avatar: profile.photos?.[0].value,
      locale: undefined,
    });
  }

  async createAnonymous(): Promise<IUserBase> {
    return { id: -1, name: 'anonymous', avatar: undefined, locale: undefined } as IUserBase;
  }

  async getByName(name: string): Promise<IUserBase | undefined> {
    return await this.get({ name });
  }

  async get(user: Partial<IUser>): Promise<IUserBase | undefined> {
    return await this.scope.model.user.get(user);
  }

  async update(user: Partial<IUser>): Promise<void> {
    await this.scope.model.user.update(user);
  }

  async delete(user: Partial<IUser>): Promise<void> {
    await this.scope.model.user.delete(user);
  }
}
