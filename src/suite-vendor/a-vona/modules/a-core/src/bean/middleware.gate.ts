import {
  BeanBase,
  IDecoratorMiddlewareOptions,
  IMiddlewareExecute,
  IMiddlewareOptionsMeta,
  Middleware,
  Next,
} from 'vona';

export interface IMiddlewareOptionsGate extends IDecoratorMiddlewareOptions, IMiddlewareOptionsMeta {}

@Middleware<IMiddlewareOptionsGate>()
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
