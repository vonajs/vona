import type { Next } from 'vona';
import type { IDecoratorMiddlewareSystemOptions, IMiddlewareSystemExecute } from 'vona-module-a-aspect';
import * as StdSerializers from 'pino-std-serializers';
import { BeanBase } from 'vona';
import { MiddlewareSystem } from 'vona-module-a-aspect';

export interface IMiddlewareSystemOptionsHttpLog extends IDecoratorMiddlewareSystemOptions {}

@MiddlewareSystem<IMiddlewareSystemOptionsHttpLog>()
export class MiddlewareSystemHttpLog extends BeanBase implements IMiddlewareSystemExecute {
  async execute(_options: IMiddlewareSystemOptionsHttpLog, next: Next) {
    // start
    const req = StdSerializers.req(this.ctx.req);
    this.loggerChild('req').http(JSON.stringify(req));
    const profiler = this.loggerChild('req').startTimer();
    // next
    await next();
    // end
    const res = StdSerializers.res(this.ctx.res);
    profiler.done({ level: 'http', message: JSON.stringify(res) });
  }
}
