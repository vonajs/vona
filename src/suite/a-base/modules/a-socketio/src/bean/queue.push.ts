import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'queue' })
export class QueuePush extends BeanBase {
  async execute(context) {
    const { options, message, messageSyncs, messageClass } = context.data;
    return await this.ctx.bean.local.ioInner.queuePush({ options, message, messageSyncs, messageClass });
  }
}
