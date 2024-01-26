import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'queue' })
export class QueueRoleBuild extends BeanBase {
  async execute(context) {
    const { options } = context.data;
    await this.ctx.bean.role._buildQueue(options);
  }
}
