import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'queue' })
export class QueueProcess extends BeanBase {
  async execute(context) {
    const { path, options, message, messageClass } = context.data;
    return await this.ctx.bean.local.ioInner.queueProcess({ path, options, message, messageClass });
  }
}
