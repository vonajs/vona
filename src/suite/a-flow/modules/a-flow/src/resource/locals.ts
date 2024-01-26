export * from '../local/procedure.js';
export * from '../local/flow.node.js';
export * from '../local/flow.listener.js';
export * from '../local/flow.flow.js';
export * from '../local/flow.edge.js';
export * from '../local/context.node.js';
export * from '../local/context.flow.js';
export * from '../local/context.edge.js';
export * from '../local/flow.js';
export * from '../local/flowDef.js';

import { LocalProcedure } from '../local/procedure.js';
import { LocalFlowNode } from '../local/flow.node.js';
import { LocalFlowListener } from '../local/flow.listener.js';
import { LocalFlowFlow } from '../local/flow.flow.js';
import { LocalFlowEdge } from '../local/flow.edge.js';
import { LocalContextNode } from '../local/context.node.js';
import { LocalContextFlow } from '../local/context.flow.js';
import { LocalContextEdge } from '../local/context.edge.js';
import { LocalFlow } from '../local/flow.js';
import { LocalFlowDef } from '../local/flowDef.js';

export interface IModuleLocal {
  procedure: LocalProcedure;
  'flow.node': LocalFlowNode;
  'flow.listener': LocalFlowListener;
  'flow.flow': LocalFlowFlow;
  'flow.edge': LocalFlowEdge;
  'context.node': LocalContextNode;
  'context.flow': LocalContextFlow;
  'context.edge': LocalContextEdge;
  flow: LocalFlow;
  flowDef: LocalFlowDef;
}
