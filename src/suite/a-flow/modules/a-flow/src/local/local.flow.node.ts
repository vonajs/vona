import { Bean } from '@cabloy/core';
import { LocalFlowNodeCycle } from './local.flow.node/local.flow.node_cycle.js';

@Bean({ scene: 'local.flow' })
export class LocalFlowNode extends LocalFlowNodeCycle {}
