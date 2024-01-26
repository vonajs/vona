import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'middleware' })
export class MiddlewareTest extends BeanBase {
  async execute(options, next) {
    if (!this.ctx.app.meta.isTest) this.ctx.throw(403);
    // next
    await next();
  }
}
