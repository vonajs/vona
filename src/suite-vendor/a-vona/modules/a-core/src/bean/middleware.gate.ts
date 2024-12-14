import {
  BeanBase,
  IDecoratorMiddlewareOptionsGlobal,
  IMiddlewareExecute,
  IMiddlewareOptionsMeta,
  Middleware,
  Next,
} from 'vona';

export interface IMiddlewareOptionsGate extends IDecoratorMiddlewareOptionsGlobal {
  gate?: IMiddlewareOptionsMeta;
}

@Middleware<IMiddlewareOptionsGate>({ global: true })
export class MiddlewareGate extends BeanBase implements IMiddlewareExecute {
  async execute(options: IMiddlewareOptionsGate, next: Next) {
    // check gate
    if (!this.app.bean.onion.checkOnionSlicOptionsMeta(options.gate)) {
      this.app.throw(403);
    }
    // next
    return next();
  }
}
