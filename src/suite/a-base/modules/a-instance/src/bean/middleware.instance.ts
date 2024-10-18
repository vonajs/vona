import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'middleware' })
export class MiddlewareInstance extends BeanBase {
  async execute(_options, next) {
    // init instance
    await this.ctx.bean.instance.initInstance();
    // next
    await next();
  }
}
