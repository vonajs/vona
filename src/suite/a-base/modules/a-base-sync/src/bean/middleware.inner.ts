import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'middleware' })
export class MiddlewareInner extends BeanBase {
  async execute(options, next) {
    if (!this.ctx.innerAccess) this.ctx.throw(403);
    // next
    await next();
  }
}
