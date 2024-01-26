import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'queue' })
export class QueuePushDirect extends BeanBase {
  async execute(context) {
    const { options, content, channel } = context.data;
    return await this.ctx.bean.local.ioInner.queuePushDirect({ options, content, channel });
  }
}
