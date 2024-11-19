import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'middleware' })
export class MiddlewareAuth extends BeanBase {
  async execute(options, next) {
    // check
    await this.app.bean.user.check(options);
    // next
    return next();
  }
}
