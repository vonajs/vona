import { __ThisModule__ } from '../resource/this.js';
import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'event' })
export class EventAccountMigration extends BeanBase {
  get modelAuth() {
    return this.getScope('a-auth').model.auth;
  }

  async execute(context, next) {
    const data = context.data;
    // provider
    const providerItem = await this.ctx.bean.authProvider.getAuthProvider({
      module: __ThisModule__,
      providerName: 'authsms',
    });
    // need not providerScene
    const authItem = await this.modelAuth.get({ userId: data.userIdFrom, providerId: providerItem.id });
    if (authItem) {
      const user = { id: data.userIdTo, mobile: authItem.profileId };
      await this.ctx.bean.user.save({ user });
    }
    // next
    await next();
  }
}
