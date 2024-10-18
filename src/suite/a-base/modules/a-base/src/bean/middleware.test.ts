import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'middleware' })
export class MiddlewareTest extends BeanBase {
  async execute(_options, next) {
    if (!this.ctx.app.meta.isTest) this.ctx.throw(403);
    // next
    await next();
  }
}
