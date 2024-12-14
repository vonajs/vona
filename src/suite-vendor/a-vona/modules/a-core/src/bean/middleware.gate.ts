import { BeanBase, IOnionOptionsMeta, Next } from 'vona';
import { IDecoratorMiddlewareOptionsGlobal, IMiddlewareExecute, Middleware } from 'vona-module-a-aspect';

export interface IMiddlewareOptionsGate extends IDecoratorMiddlewareOptionsGlobal {
  gate?: IOnionOptionsMeta;
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
