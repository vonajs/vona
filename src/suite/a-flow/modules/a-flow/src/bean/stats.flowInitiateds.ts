import { Bean, BeanBase } from '@cabloy/core';
import { __ThisModule__ } from '../resource/this.js';

@Bean({ scene: 'stats' })
export class StatsFlowInitiateds extends BeanBase {
  async execute(context) {
    const { user } = context;
    const modelFlow = this.ctx.model.module(__ThisModule__).flow;
    const count = await modelFlow.count({
      flowUserId: user.id,
    });
    return count;
  }
}
