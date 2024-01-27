import { __ThisModule__ } from '../resource/this.js';
import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'stats' })
export class StatsDraftsFlowing extends BeanBase {
  async execute(context) {
    const { user } = context;
    const modelAtom = this.ctx.model.module(__ThisModule__).atom;
    const count = await modelAtom.count({
      userIdUpdated: user.id,
      atomStage: 0,
      atomClosed: 0,
      atomFlowId: {
        op: '>',
        val: 0,
      },
    });
    return count;
  }
}
