import { Bean } from '@cabloy/core';
import { FlowNodeGatewayBase } from '../common/flowNodeGatewayBase.js';

@Bean({ scene: 'flow.node' })
export class FlowNodeGatewayInclusive extends FlowNodeGatewayBase {
  constructor(options) {
    super(options, 'inclusive');
  }
}
