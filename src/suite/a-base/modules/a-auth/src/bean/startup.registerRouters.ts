import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'startup' })
export class StartupRegisterRouters extends BeanBase {
  async execute(/* context*/) {
    // register routers
    await this.ctx.bean.authProvider._registerRouters();
  }
}
