import type { TableIdentity } from 'vona-module-a-orm';
import type { IAuthUserProfile, IUserBase, IUserInnerAdapter } from 'vona-module-a-user';
import type { IUser } from '../types/user.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceUserInnerAdapter extends BeanBase implements IUserInnerAdapter {
  async create(user: Partial<IUser>): Promise<IUserBase> {
    return await this.scope.model.user.insert(user);
  }

  async userOfProfile(profile: IAuthUserProfile): Promise<IUserBase> {
    return {
      name: profile.username!,
      email: profile.emails?.[0].value,
      avatar: profile.photos?.[0].value,
      locale: undefined,
    } as IUser;
  }

  async createAnonymous(): Promise<IUserBase> {
    return { id: -1, name: 'anonymous', avatar: undefined, locale: undefined } as IUser;
  }

  async findOneByName(name: string): Promise<IUserBase | undefined> {
    return await this.findOne({ name });
  }

  async findOne(user: Partial<IUser>): Promise<IUserBase | undefined> {
    return await this.scope.model.user.get(user);
  }

  async update(user: Partial<IUser>): Promise<void> {
    await this.scope.model.user.update(user);
  }

  async remove(user: Partial<IUser>): Promise<void> {
    await this.scope.model.user.delete(user);
  }

  async setActivated(id: TableIdentity, activated: boolean): Promise<void> {
    await this.scope.model.user.update({ id, activated });
  }
}
