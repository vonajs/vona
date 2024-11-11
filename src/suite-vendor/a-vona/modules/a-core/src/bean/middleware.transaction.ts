import { BeanBase, IDecoratorMiddlewareOptions, IMiddlewareExecute, Middleware, Next } from 'vona';

export interface IMiddlewareOptionsTransaction extends IDecoratorMiddlewareOptions {}

@Middleware<IMiddlewareOptionsTransaction>({})
export class MiddlewareTransaction extends BeanBase implements IMiddlewareExecute {
  async execute(_options: IMiddlewareOptionsTransaction, next: Next) {
    return await this.ctx.transaction.begin(async () => {
      // next
      const res = await next();
      checkIfSuccess(this.ctx);
      return res;
    });
  }
}

function checkIfSuccess(ctx) {
  if (typeof ctx.response.body === 'object' && ctx.response.body && ctx.response.body.code !== undefined) {
    if (ctx.response.body.code !== 0) {
      throw ctx.app.meta.util.createError(ctx.response.body);
    }
  } else {
    if (ctx.response.status !== 404 && ctx.response.status !== 200) {
      ctx.throw(ctx.response.status);
    }
  }
}
