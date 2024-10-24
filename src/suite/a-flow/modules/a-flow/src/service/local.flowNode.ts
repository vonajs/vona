import { Bean } from 'vona';
import { LocalFlowNodeCycle } from './local.flow.node/local.flow.node_cycle.js';

@Bean({ scene: 'service.local' })
export class ServiceLocalFlowNode extends LocalFlowNodeCycle {}
