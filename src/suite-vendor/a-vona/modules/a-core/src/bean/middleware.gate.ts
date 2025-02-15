import type { Next } from 'vona';
import { BeanBase } from 'vona';
import type { IDecoratorMiddlewareOptionsGlobal, IMiddlewareExecute } from 'vona-module-a-aspect';
import { Middleware } from 'vona-module-a-aspect';
import type { IOnionOptionsMeta } from 'vona-module-a-onion';

export interface IMiddlewareOptionsGate extends IDecoratorMiddlewareOptionsGlobal {
  gate?: IOnionOptionsMeta;
}

@Middleware<IMiddlewareOptionsGate>({ global: true })
export class MiddlewareGate extends BeanBase implements IMiddlewareExecute {
  async execute(options: IMiddlewareOptionsGate, next: Next) {
    // check gate
    if (!this.app.bean.onion.checkOnionOptionsMeta(options.gate)) {
      this.app.throw(403);
    }
    // next
    return next();
  }
}
