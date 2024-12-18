import { BeanBase } from 'vona';
import { TypeEventAccountMigrationData, TypeEventAccountMigrationResult } from 'vona-module-a-base';
import { EventListener, IEventExecute, NextEvent } from 'vona-module-a-event';
import { __ThisModule__ } from '../.metadata/this.js';

@EventListener({ match: 'a-base:accountMigration' })
export class EventListenerAccountMigration
  extends BeanBase
  implements IEventExecute<TypeEventAccountMigrationData, TypeEventAccountMigrationResult>
{
  get modelAuth() {
    return this.$scope.auth.model.auth;
  }

  async execute(
    data: TypeEventAccountMigrationData,
    next: NextEvent<TypeEventAccountMigrationData, TypeEventAccountMigrationResult>,
  ): Promise<TypeEventAccountMigrationResult> {
    // provider
    const providerItem = await this.app.bean.authProvider.getAuthProvider({
      module: __ThisModule__,
      providerName: 'authsms',
    });
    // need not providerScene
    const authItem = await this.modelAuth.get({ userId: data.userIdFrom, providerId: providerItem.id });
    if (authItem) {
      const user = { id: data.userIdTo, mobile: authItem.profileId };
      await this.app.bean.user.save({ user });
    }
    // next
    return next();
  }
}
