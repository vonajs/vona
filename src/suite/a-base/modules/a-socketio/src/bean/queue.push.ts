import { Bean, BeanBase } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Bean({ scene: 'queue' })
export class QueuePush extends BeanBase<ScopeModule> {
  async execute(context) {
    const { options, message, messageSyncs, messageClass } = context.data;
    return await this.scope.service.ioInner.queuePush({ options, message, messageSyncs, messageClass });
  }
}
