export * from '../model/flowDef.js';
export * from '../model/flowDefContent.js';
export * from '../model/flowDefFull.js';
export * from '../model/flow.js';
export * from '../model/flowHistory.js';
export * from '../model/flowNode.js';
export * from '../model/flowNodeHistory.js';

import { ModelFlowDef } from '../model/flowDef.js';
import { ModelFlowDefContent } from '../model/flowDefContent.js';
import { ModelFlowDefFull } from '../model/flowDefFull.js';
import { ModelFlow } from '../model/flow.js';
import { ModelFlowHistory } from '../model/flowHistory.js';
import { ModelFlowNode } from '../model/flowNode.js';
import { ModelFlowNodeHistory } from '../model/flowNodeHistory.js';

export interface IModuleModel {
  flowDef: ModelFlowDef;
  flowDefContent: ModelFlowDefContent;
  flowDefFull: ModelFlowDefFull;
  flow: ModelFlow;
  flowHistory: ModelFlowHistory;
  flowNode: ModelFlowNode;
  flowNodeHistory: ModelFlowNodeHistory;
}
