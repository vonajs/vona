export * from '../local/right.js';
export * from '../local/procedure.js';
export * from '../local/local.context.task.js';
export * from '../local/flow.js';
export * from '../local/flowTask.js';

import { LocalRight } from '../local/right.js';
import { LocalProcedure } from '../local/procedure.js';
import { LocalFlow } from '../local/flow.js';
import { LocalFlowTask } from '../local/flowTask.js';

export interface IModuleLocal {
  right: LocalRight;
  procedure: LocalProcedure;
  flow: LocalFlow;
  flowTask: LocalFlowTask;
}
