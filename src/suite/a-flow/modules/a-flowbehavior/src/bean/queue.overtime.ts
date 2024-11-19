import { Bean, BeanBase } from 'vona';
import { FlowBehaviorOvertime } from './flow.behavior.overtime.js';

@Bean({ scene: 'queue' })
export class QueueOvertime extends BeanBase {
  async execute(context) {
    const _behaviorBean = this.app.bean._newBean(FlowBehaviorOvertime);
    await _behaviorBean._runJob(context);
  }
}
