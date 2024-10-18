import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'broadcast' })
export class BroadcastResetCache extends BeanBase {
  async execute() {
    await this.ctx.bean.instance.resetCache({ subdomain: this.ctx.subdomain });
  }
}
