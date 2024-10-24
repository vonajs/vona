import { Service } from 'vona';
import { LocalFlowNodeCycle } from './local.flow.node/local.flow.node_cycle.js';

@Service()
export class ServiceLocalFlowNode extends LocalFlowNodeCycle {}
