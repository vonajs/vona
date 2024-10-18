import { Bean, BeanBase } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Bean({ scene: 'queue' })
export class QueuePushDirect extends BeanBase<ScopeModule> {
  async execute(context) {
    const { options, content, channel } = context.data;
    return await this.scope.local.ioInner.queuePushDirect({ options, content, channel });
  }
}
