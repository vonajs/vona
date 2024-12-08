import { Bean, BeanBase } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Bean({ scene: 'broadcast' })
export class BroadcastResetCache extends BeanBase<ScopeModule> {
  async execute() {
    await this.scope.service.instance.resetCache(this.ctx.subdomain);
  }
}
