import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'broadcast' })
export class BroadcastResetCache extends BeanBase {
  async execute() {
    await this.scope.service.instance.resetCache(this.ctx.subdomain);
  }
}
