import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'broadcast' })
export class BroadcastResetCache extends BeanBase {
  async execute() {
    await this.ctx.bean.instance.resetCache({ subdomain: this.ctx.subdomain });
  }
}
