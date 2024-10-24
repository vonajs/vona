import { ScopeModule } from '../.metadata/this.js';
import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'event' })
export class EventAccountMigration extends BeanBase<ScopeModule> {
  get modelAuthOpen() {
    return this.scope.model.authOpen;
  }
  async execute(context, next) {
    const data = context.data;
    // delete aAuthOpen/aAuth
    const items = await this.modelAuthOpen.select({
      where: { userId: data.userIdFrom },
    });
    for (const item of items) {
      await this.ctx.bean.atom.delete({ key: { atomId: item.atomId } });
    }
    // next
    await next();
  }
}
