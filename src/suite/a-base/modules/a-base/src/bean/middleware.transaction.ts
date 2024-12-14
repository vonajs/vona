import { BeanBase } from 'vona';
import { Middleware } from 'vona-module-a-aspect';

@Middleware()
export class MiddlewareTransaction extends BeanBase {
  async execute(_options, next) {
    await this.ctx.transaction.begin(async () => {
      // next
      await next();
      checkIfSuccess(this.ctx);
    });
  }
}

function checkIfSuccess(ctx) {
  if (typeof ctx.response.body === 'object' && ctx.response.body && ctx.response.body.code !== undefined) {
    if (ctx.response.body.code !== 0) {
      throw ctx.app.meta.util.createError(ctx.response.body);
    }
  } else {
    if (ctx.response.status !== 200) {
      ctx.app.throw(ctx.response.status);
    }
  }
}
