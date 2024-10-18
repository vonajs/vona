import { Bean } from 'vona';
import { FlowNodeGatewayBase } from '../common/flowNodeGatewayBase.js';

@Bean({ scene: 'flow.node' })
export class FlowNodeGatewayExclusive extends FlowNodeGatewayBase {
  constructor() {
    super('exclusive');
  }
}
