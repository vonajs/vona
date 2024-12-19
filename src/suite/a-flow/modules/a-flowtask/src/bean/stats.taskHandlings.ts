import { BeanTemp } from 'vona-module-a-bean';
import { BeanBase } from 'vona';

@BeanTemp({ scene: 'stats' })
export class StatsTaskHandlings extends BeanBase {
  async execute(context) {
    const { user } = context;
    const modelFlowTask = this.scope.model.flowTask;
    const count = await modelFlowTask.count({
      where: {
        userIdAssignee: user.id,
        flowTaskStatus: 0,
        timeClaimed: { op: 'notNull' },
      },
    });
    return count;
  }
}
