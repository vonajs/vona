import type { TableIdentity } from 'table-identity';
import type { IAuthUserProfile, IUserBase, IUserInnerAdapter } from 'vona-module-a-user';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceUserInnerAdapter extends BeanBase implements IUserInnerAdapter {
  async create(user: Partial<IUserBase>): Promise<IUserBase> {
    return await this.scope.model.user.insert(user);
  }

  async userOfProfile(profile: IAuthUserProfile): Promise<IUserBase> {
    return {
      name: profile.username!,
      email: profile.emails?.[0].value,
      avatar: profile.photos?.[0].value,
      locale: profile.locale || this.ctx.locale,
    } as IUserBase;
  }

  async createAnonymous(): Promise<IUserBase> {
    return { id: -1, anonymous: true, name: 'anonymous', avatar: undefined, locale: undefined } as IUserBase;
  }

  async findOneByName(name: string): Promise<IUserBase | undefined> {
    return await this.scope.model.user.get({ name: { _eqI_: name } });
  }

  async findOne(user: Partial<IUserBase>): Promise<IUserBase | undefined> {
    return await this.scope.model.user.get(user);
  }

  async update(user: Partial<IUserBase>): Promise<void> {
    await this.scope.model.user.update(user);
  }

  async remove(user: Partial<IUserBase>): Promise<void> {
    await this.scope.model.user.delete(user);
  }

  async setActivated(id: TableIdentity, activated: boolean): Promise<void> {
    await this.scope.model.user.update({ id, activated });
  }
}
