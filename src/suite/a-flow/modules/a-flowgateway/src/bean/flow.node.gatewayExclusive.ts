import { BeanTemp } from 'vona-module-a-bean';

import { FlowNodeGatewayBase } from '../common/flowNodeGatewayBase.js';

@BeanTemp({ scene: 'flow.node' })
export class FlowNodeGatewayExclusive extends FlowNodeGatewayBase {
  constructor() {
    super('exclusive');
  }
}
