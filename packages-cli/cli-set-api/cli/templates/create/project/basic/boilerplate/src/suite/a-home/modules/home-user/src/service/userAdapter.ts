import type { TableIdentity } from 'table-identity';
import type { IAuthUserProfile, IUserAdapter, IUser } from 'vona-module-a-user';
import type { EntityUser } from '../entity/user.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceUserAdapter extends BeanBase implements IUserAdapter {
  async create(user: Partial<EntityUser>): Promise<EntityUser> {
    return await this.scope.model.user.insert(user);
  }

  async userOfProfile(profile: IAuthUserProfile): Promise<Partial<EntityUser>> {
    return {
      name: profile.username!,
      email: profile.emails?.[0].value,
      avatar: profile.photos?.[0].value,
      locale: profile.locale || this.ctx.locale,
    };
  }

  async createAnonymous(): Promise<Partial<IUser>> {
    return { id: -1, anonymous: true, name: 'anonymous' };
  }

  async findOneByName(name: string): Promise<EntityUser | undefined> {
    return await this.scope.model.user.getByNameEqI(name);
  }

  async findOne(user: Partial<EntityUser>): Promise<EntityUser | undefined> {
    return await this.scope.model.user.get(user);
  }

  async update(user: Partial<EntityUser>): Promise<void> {
    await this.scope.model.user.update(user);
  }

  async remove(user: Partial<EntityUser>): Promise<void> {
    await this.scope.model.user.delete(user);
  }

  async setActivated(id: TableIdentity, activated: boolean): Promise<void> {
    await this.scope.model.user.update({ id, activated });
  }
}
