import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'middleware' })
export class MiddlewareInner extends BeanBase {
  async execute(_options, next) {
    if (!this.ctx.innerAccess) this.ctx.throw(403);
    // next
    await next();
  }
}
