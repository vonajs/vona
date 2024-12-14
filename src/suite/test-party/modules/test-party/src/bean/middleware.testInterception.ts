import { BeanBase } from 'vona';
import { Middleware } from 'vona-module-a-aspect';

@Middleware()
export class MiddlewareTestInterception extends BeanBase {
  async execute(_options, next) {
    const { a, b } = this.ctx.request.body;
    if (a === undefined || b === undefined) return this.app.throw(1002); // 1002: 'Incomplete Parameters'
    // next
    await next();
  }
}
