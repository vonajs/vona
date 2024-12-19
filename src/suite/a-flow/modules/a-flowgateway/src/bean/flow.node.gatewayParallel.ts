import { BeanTemp } from 'vona-module-a-bean';

import { FlowNodeGatewayBase } from '../common/flowNodeGatewayBase.js';

@BeanTemp({ scene: 'flow.node' })
export class FlowNodeGatewayParallel extends FlowNodeGatewayBase {
  constructor() {
    super('parallel');
  }
}
