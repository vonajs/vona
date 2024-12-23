import { IDecoratorMiddlewareOptions, IMiddlewareExecute, Middleware } from 'vona-module-a-aspect';
import { TransactionIsolationLevels } from '../types/transaction.js';
import { BeanBase, Next } from 'vona';

export interface IMiddlewareOptionsTransaction extends IDecoratorMiddlewareOptions {
  isolationLevel: TransactionIsolationLevels;
  readOnly: boolean;
}

@Middleware<IMiddlewareOptionsTransaction>({ isolationLevel: 'read committed', readOnly: false })
export class MiddlewareTransaction extends BeanBase implements IMiddlewareExecute {
  async execute(options: IMiddlewareOptionsTransaction, next: Next) {
    return await this.ctx.transaction.begin(async () => {
      // next
      const res = await next();
      checkIfSuccess(this.ctx);
      return res;
    }, options);
  }
}

function checkIfSuccess(ctx) {
  if (typeof ctx.response.body === 'object' && ctx.response.body && ctx.response.body.code !== undefined) {
    if (ctx.response.body.code !== 0) {
      throw ctx.app.util.createError(ctx.response.body);
    }
  } else {
    if (ctx.response.status !== 404 && ctx.response.status !== 200) {
      ctx.app.throw(ctx.response.status);
    }
  }
}
