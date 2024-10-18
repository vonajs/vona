import { Bean, BeanBase } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Bean({ scene: 'queue' })
export class QueueDelivery extends BeanBase<ScopeModule> {
  async execute(context) {
    const { path, options, message, messageSyncs, messageClass } = context.data;
    return await this.scope.local.ioInner.queueDelivery({ path, options, message, messageSyncs, messageClass });
  }
}
