import { Bean } from '@cabloy/core';
import { FlowNodeGatewayBase } from '../common/flowNodeGatewayBase.js';

@Bean({ scene: 'flow.node' })
export class FlowNodeGatewayParallel extends FlowNodeGatewayBase {
  constructor() {
    super('parallel');
  }
}
