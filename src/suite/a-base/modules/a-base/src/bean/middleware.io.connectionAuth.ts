import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'middleware.io' })
export class MiddlewareIoConnectionAuth extends BeanBase {
  async execute(options, next) {
    // check
    await this.ctx.bean.user.check(options);
    // next
    await next();
  }
}
