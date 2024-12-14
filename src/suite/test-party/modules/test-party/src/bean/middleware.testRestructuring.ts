import { BeanBase } from 'vona';
import { Middleware } from 'vona-module-a-aspect';

@Middleware()
export class MiddlewareTestRestructuring extends BeanBase {
  async execute(_options, next) {
    const { a, b } = this.ctx.request.body;
    this.ctx.request.body.a = parseInt(a);
    this.ctx.request.body.b = parseInt(b);
    // next
    await next();
  }
}
