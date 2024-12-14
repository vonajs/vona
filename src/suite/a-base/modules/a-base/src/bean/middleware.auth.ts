import { BeanBase } from 'vona';
import { Middleware } from 'vona-module-a-aspect';

@Middleware()
export class MiddlewareAuth extends BeanBase {
  async execute(options, next) {
    // check
    await this.app.bean.user.check(options);
    // next
    return next();
  }
}
