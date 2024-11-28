import {
  BeanBase,
  IDecoratorMiddlewareOptionsGlobal,
  IMiddlewareExecute,
  IMiddlewareOptionsMeta,
  Middleware,
  Next,
} from 'vona';

export interface IMiddlewareOptionsGate extends IDecoratorMiddlewareOptionsGlobal, IMiddlewareOptionsMeta {}

@Middleware<IMiddlewareOptionsGate>({ global: true })
export class MiddlewareGate extends BeanBase implements IMiddlewareExecute {
  async execute(options: IMiddlewareOptionsGate, next: Next) {
    // check gate
    if (!this.ctx.app.meta.util.checkMiddlewareOptionsMeta(options)) {
      this.app.throw(403);
    }
    // next
    return next();
  }
}
