import { Bean, BeanBase } from 'vona';
import { FlowNodeStartEventTimer } from './flow.node.startEventTimer.js';

@Bean({ scene: 'queue' })
export class QueueStartEventTimer extends BeanBase {
  async execute(context) {
    const _nodeBaseBean = this.app.bean._newBean(FlowNodeStartEventTimer);
    await _nodeBaseBean._runSchedule(context);
  }
}
