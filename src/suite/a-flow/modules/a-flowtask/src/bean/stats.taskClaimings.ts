import { Bean, BeanBase } from '@cabloy/core';
import { __ThisModule__ } from '../resource/this.js';

@Bean({ scene: 'stats' })
export class StatsTaskClaimings extends BeanBase {
  async execute(context) {
    const { user } = context;
    const modelFlowTask = this.ctx.model.module(__ThisModule__).flowTask;
    const count = await modelFlowTask.count({
      userIdAssignee: user.id,
      flowTaskStatus: 0,
      timeClaimed: null,
    });
    return count;
  }
}
