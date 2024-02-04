import { ScopeModule } from '../resource/this.js';
import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'stats' })
export class StatsDraftsFlowing extends BeanBase<ScopeModule> {
  async execute(context) {
    const { user } = context;
    const modelAtom = this.scope.model.atom;
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
