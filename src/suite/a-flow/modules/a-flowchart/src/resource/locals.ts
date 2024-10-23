export * from '../local/flow.js';
export * from '../local/flowDef.js';

import { LocalFlow } from '../local/flow.js';
import { LocalFlowDef } from '../local/flowDef.js';

export interface IModuleService {
  flow: LocalFlow;
  flowDef: LocalFlowDef;
}
