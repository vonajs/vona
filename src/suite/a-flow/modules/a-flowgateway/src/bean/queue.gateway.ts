import { __ThisModule__ } from '../resource/this.js';
import { Bean, BeanBase, Cast } from 'vona';

@Bean({ scene: 'queue' })
export class QueueGateway extends BeanBase {
  async execute(context) {
    const { gatewayMode } = context.data;
    const flowNodeType = gatewayMode === 'parallel' ? 'gatewayParallel' : 'gatewayInclusive';
    const _nodeBean = this.ctx.bean._newBean(`${__ThisModule__}.flow.node.${flowNodeType}`);
    await Cast(_nodeBean)._runCheck(context);
  }
}
