import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'middleware' })
export class MiddlewareGate extends BeanBase {
  async execute(options, next) {
    // check gate
    if (!this.ctx.app.meta.util.checkGate(options)) {
      this.app.throw(403);
    }
    // next
    return next();
  }
}
