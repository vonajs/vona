import type { Next } from 'vona';
import type { IDecoratorMiddlewareOptions, IMiddlewareExecute } from 'vona-module-a-aspect';
import { BeanBase } from 'vona';
import { Middleware } from 'vona-module-a-aspect';

export interface IMiddlewareOptionsDevelopment extends IDecoratorMiddlewareOptions {
  test?: boolean;
  local?: boolean;
}

@Middleware<IMiddlewareOptionsDevelopment>({ test: true, local: true })
export class MiddlewareDevelopment extends BeanBase implements IMiddlewareExecute {
  async execute(options: IMiddlewareOptionsDevelopment, next: Next) {
    if (this.app.meta.isProd) this.app.throw(403);
    if (this.app.meta.isLocal && !options.local) this.app.throw(403);
    if (this.app.meta.isTest && !options.test) this.app.throw(403);
    // next
    return next();
  }
}
