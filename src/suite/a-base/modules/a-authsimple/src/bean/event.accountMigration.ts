import { ScopeModule } from '../.metadata/this.js';
import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'event' })
export class EventAccountMigration extends BeanBase<ScopeModule> {
  async execute(context, next) {
    const data = context.data;
    const modelAuthSimple = this.scope.model.authSimple;
    // check userIdFrom
    const authSimple = await modelAuthSimple.get({ userId: data.userIdFrom });
    if (authSimple) {
      // delete old record
      await modelAuthSimple.delete({ userId: data.userIdTo });
      // update
      await modelAuthSimple.update(
        { userId: data.userIdTo },
        {
          where: {
            userId: data.userIdFrom,
          },
        },
      );
    }
    // next
    await next();
  }
}
