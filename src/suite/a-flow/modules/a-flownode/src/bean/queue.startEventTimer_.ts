import { Bean, BeanBase } from 'vona';
import { FlowNodeStartEventTimer } from './flow.node.startEventTimer.js';

@Bean({ scene: 'queue' })
export class QueueStartEventTimer extends BeanBase {
  async execute(context) {}
}
