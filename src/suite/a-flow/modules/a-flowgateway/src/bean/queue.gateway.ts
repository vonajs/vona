import { __ThisModule__ } from '../.metadata/this.js';
import { Bean, BeanBase, cast } from 'vona';

@Bean({ scene: 'queue' })
export class QueueGateway extends BeanBase {
  async execute(context) {
    const { gatewayMode } = context.data;
    const flowNodeType = gatewayMode === 'parallel' ? 'gatewayParallel' : 'gatewayInclusive';
    const _nodeBean = this.app.bean._newBean(`${__ThisModule__}.flow.node.${flowNodeType}`);
    await cast(_nodeBean)._runCheck(context);
  }
}
