import type { Next } from 'vona';
import type { IDecoratorMiddlewareSystemOptions, IMiddlewareSystemExecute } from 'vona-module-a-aspect';
import { BeanBase } from 'vona';
import { MiddlewareSystem } from 'vona-module-a-aspect';

export interface IMiddlewareSystemOptionsHttpLog extends IDecoratorMiddlewareSystemOptions {}

@MiddlewareSystem<IMiddlewareSystemOptionsHttpLog>()
export class MiddlewareSystemHttpLog extends BeanBase implements IMiddlewareSystemExecute {
  async execute(_options: IMiddlewareSystemOptionsHttpLog, next: Next) {
    // start
    const profiler = this.logger.startTimer();
    // next
    await next();
    profiler.done({ level: 'info' });
  }
}
