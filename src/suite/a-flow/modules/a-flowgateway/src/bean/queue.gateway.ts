import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'queue' })
export class QueueGateway extends BeanBase {
  async execute(context) {
    const { mode } = context.data;
    const flowNodeType = mode === 'parallel' ? 'gatewayParallel' : 'gatewayInclusive';
    const _nodeBean = this.ctx.bean._newBean(`${__ThisModule__}.flow.node.${flowNodeType}`);
    await _nodeBean._runCheck(context);
  }
}
