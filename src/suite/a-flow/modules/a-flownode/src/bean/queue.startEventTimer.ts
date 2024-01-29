import { Bean, BeanBase } from '@cabloy/core';
import { FlowNodeStartEventTimer } from './flow.node.startEventTimer.js';

@Bean({ scene: 'queue' })
export class QueueStartEventTimer extends BeanBase {
  async execute(context) {
    const _nodeBaseBean = this.ctx.bean._newBean(FlowNodeStartEventTimer);
    await _nodeBaseBean._runSchedule(context);
  }
}
