import { Bean, BeanBase } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Bean({ scene: 'broadcast' })
export class BroadcastReload extends BeanBase<ScopeModule> {
  async execute() {
    await this.scope.service.instance.instanceStartup(this.ctx.subdomain, { force: true });
  }
}
