import { Bean, BeanBase } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Bean({ scene: 'stats' })
export class StatsFlowInitiateds extends BeanBase<ScopeModule> {
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
