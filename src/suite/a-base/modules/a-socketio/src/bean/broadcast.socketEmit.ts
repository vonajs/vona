import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'broadcast' })
export class BroadcastSocketEmit extends BeanBase {
  async execute(context) {
    const data = context.data;
    this.ctx.bean.io.broadcastSocketEmit(data);
  }
}
