import { __ThisModule__ } from '../resource/this.js';
import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'event' })
export class EventAccountMigration extends BeanBase {
  async execute(context, next) {
    const data = context.data;
    const modelAuthSimple = this.scope.model.authSimple;
    // check userIdFrom
    const authSimple = await modelAuthSimple.get({ userId: data.userIdFrom });
    if (authSimple) {
      // delete old record
      await this.bean.model.query('delete from aAuthSimple where deleted=0 and iid=? and userId=?', [
        this.ctx.instance.id,
        data.userIdTo,
      ]);
      // update
      await this.bean.model.query('update aAuthSimple a set a.userId=? where a.deleted=0 and a.iid=? and a.userId=?', [
        data.userIdTo,
        this.ctx.instance.id,
        data.userIdFrom,
      ]);
    }
    // next
    await next();
  }
}
