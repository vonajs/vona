import { BeanTemp } from 'vona-module-a-bean';

import { FlowNodeGatewayBase } from '../common/flowNodeGatewayBase.js';

@BeanTemp({ scene: 'flow.node' })
export class FlowNodeGatewayInclusive extends FlowNodeGatewayBase {
  constructor() {
    super('inclusive');
  }
}
