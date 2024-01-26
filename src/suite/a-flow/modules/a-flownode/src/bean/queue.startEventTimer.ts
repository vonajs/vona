import { __ThisModule__ } from '../resource/this.js';
import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'queue' })
export class QueueStartEventTimer extends BeanBase {
  async execute(context) {
    const _nodeBaseBean = this.ctx.bean._newBean(`${__ThisModule__}.flow.node.startEventTimer`);
    await _nodeBaseBean._runSchedule(context);
  }
}
