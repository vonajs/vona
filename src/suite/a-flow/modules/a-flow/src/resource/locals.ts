export * from '../local/procedure.js';
export * from '../local/local.flow.node.js';
export * from '../local/local.flow.listener.js';
export * from '../local/local.flow.flow.js';
export * from '../local/local.flow.edge.js';
export * from '../local/local.context.node.js';
export * from '../local/local.context.flow.js';
export * from '../local/local.context.edge.js';
export * from '../local/flow.js';
export * from '../local/flowDef.js';

import { LocalProcedure } from '../local/procedure.js';
import { LocalFlow } from '../local/flow.js';
import { LocalFlowDef } from '../local/flowDef.js';

export interface IModuleService {
  procedure: LocalProcedure;
  flow: LocalFlow;
  flowDef: LocalFlowDef;
}
