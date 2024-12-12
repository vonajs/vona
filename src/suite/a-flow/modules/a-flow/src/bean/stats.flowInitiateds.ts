import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'stats' })
export class StatsFlowInitiateds extends BeanBase {
  async execute(context) {
    const { user } = context;
    const modelFlow = this.scope.model.flow;
    const count = await modelFlow.count({
      where: {
        flowUserId: user.id,
      },
    });
    return count;
  }
}
