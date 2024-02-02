import { Bean, BeanBase } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Bean({ scene: 'queue' })
export class QueuePush extends BeanBase<ScopeModule> {
  async execute(context) {
    const { options, message, messageSyncs, messageClass } = context.data;
    return await this.scope.local.ioInner.queuePush({ options, message, messageSyncs, messageClass });
  }
}
