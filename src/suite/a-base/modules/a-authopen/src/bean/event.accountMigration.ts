import { __ThisModule__ } from '../resource/this.js';
import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'event' })
export class EventAccountMigration extends BeanBase {
  get modelAuthOpen() {
    return this.ctx.model.module(__ThisModule__).authOpen;
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
