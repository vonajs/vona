import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'stats' })
export class StatsFlowInitiateds extends BeanBase {
  async execute(context) {
    const { user } = context;
    const modelFlow = this.ctx.model.module(moduleInfo).flow;
    const count = await modelFlow.count({
      flowUserId: user.id,
    });
    return count;
  }
}
