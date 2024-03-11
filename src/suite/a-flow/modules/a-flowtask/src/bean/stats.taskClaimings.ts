import { Bean, BeanBase } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Bean({ scene: 'stats' })
export class StatsTaskClaimings extends BeanBase<ScopeModule> {
  async execute(context) {
    const { user } = context;
    const modelFlowTask = this.scope.model.flowTask;
    const count = await modelFlowTask.count({
      where: {
        userIdAssignee: user.id,
        flowTaskStatus: 0,
        timeClaimed: null,
      },
    });
    return count;
  }
}
