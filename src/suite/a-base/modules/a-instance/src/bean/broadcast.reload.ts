import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'broadcast' })
export class BroadcastReload extends BeanBase {
  async execute() {
    await this.ctx.bean.instance.instanceStartup({
      subdomain: this.ctx.subdomain,
      options: {
        force: true,
        instanceBase: null,
      },
    });
  }
}
