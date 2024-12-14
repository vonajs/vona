import { BeanBase } from 'vona';
import { Middleware } from 'vona-module-a-aspect';

@Middleware()
export class MiddlewareInner extends BeanBase {
  async execute(_options, next) {
    if (!this.ctx.innerAccess) this.app.throw(403);
    // next
    await next();
  }
}
