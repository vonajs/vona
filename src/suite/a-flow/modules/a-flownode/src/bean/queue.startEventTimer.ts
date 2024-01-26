import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'queue' })
export class QueueStartEventTimer extends BeanBase {
  async execute(context) {
    const _nodeBaseBean = this.ctx.bean._newBean(`${moduleInfo.relativeName}.flow.node.startEventTimer`);
    await _nodeBaseBean._runSchedule(context);
  }
}
