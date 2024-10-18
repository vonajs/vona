import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'middleware' })
export class Middleware extends BeanBase {
  async execute(_options, next) {
    // check appReady
    if (!this.ctx.innerAccess) {
      await this.ctx.bean.instance.checkAppReady();
    }
    // next
    await next();
  }
}
