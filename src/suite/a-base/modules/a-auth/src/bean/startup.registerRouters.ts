import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'startup' })
export class StartupRegisterRouters extends BeanBase {
  async execute(/* context*/) {
    // register routers
    await this.ctx.bean.authProvider._registerRouters();
  }
}
