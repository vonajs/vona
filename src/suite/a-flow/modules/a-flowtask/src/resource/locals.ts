export * from '../local/flow.js';
export * from '../local/flowTask.js';

import { LocalFlow } from '../local/flow.js';
import { LocalFlowTask } from '../local/flowTask.js';

export interface IModuleLocal {
  flow: LocalFlow;
  flowTask: LocalFlowTask;
}
