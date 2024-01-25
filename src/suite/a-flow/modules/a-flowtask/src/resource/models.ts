export * from '../model/flowNodeStartEventAtomCondition.js';
export * from '../model/flowTask.js';
export * from '../model/flowTaskHistory.js';

import { ModelFlowNodeStartEventAtomCondition } from '../model/flowNodeStartEventAtomCondition.js';
import { ModelFlowTask } from '../model/flowTask.js';
import { ModelFlowTaskHistory } from '../model/flowTaskHistory.js';

export interface IModuleModel {
  flowNodeStartEventAtomCondition: ModelFlowNodeStartEventAtomCondition;
  flowTask: ModelFlowTask;
  flowTaskHistory: ModelFlowTaskHistory;
}
