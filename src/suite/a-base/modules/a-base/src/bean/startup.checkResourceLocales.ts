import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'startup' })
export class StartupCheckResourceLocales extends BeanBase {
  async execute() {
    await this.ctx.bean.resource.checkLocales();
  }
}
