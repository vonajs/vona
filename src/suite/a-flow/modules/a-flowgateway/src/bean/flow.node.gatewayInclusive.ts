import { Bean } from 'vona';
import { FlowNodeGatewayBase } from '../common/flowNodeGatewayBase.js';

@Bean({ scene: 'flow.node' })
export class FlowNodeGatewayInclusive extends FlowNodeGatewayBase {
  constructor() {
    super('inclusive');
  }
}
