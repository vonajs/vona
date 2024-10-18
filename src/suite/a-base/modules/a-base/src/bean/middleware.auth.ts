import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'middleware' })
export class MiddlewareAuth extends BeanBase {
  async execute(options, next) {
    // check
    await this.ctx.bean.user.check(options);
    // next
    await next();
  }
}
