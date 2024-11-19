import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'startup' })
export class StartupRegisterRouters extends BeanBase {
  async execute(/* context*/) {
    // register routers
    await this.app.bean.authProvider._registerRouters();
  }
}
