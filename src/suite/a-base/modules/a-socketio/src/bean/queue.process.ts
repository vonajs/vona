import { Bean, BeanBase } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Bean({ scene: 'queue' })
export class QueueProcess extends BeanBase<ScopeModule> {
  async execute(context) {
    const { path, options, message, messageClass } = context.data;
    return await this.scope.local.ioInner.queueProcess({ path, options, message, messageClass });
  }
}
