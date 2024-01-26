import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'stats' })
export class StatsTaskHandlings extends BeanBase {
  async execute(context) {
    const { user } = context;
    const modelFlowTask = this.ctx.model.module(moduleInfo).flowTask;
    const count = await modelFlowTask.count({
      userIdAssignee: user.id,
      flowTaskStatus: 0,
      timeClaimed: { op: 'notNull' },
    });
    return count;
  }
}
