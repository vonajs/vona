import {} from '@cabloy/core';

export interface EntityFlowNode extends EntityBase {
  flowId: number;
  flowNodeDefId: string;
  flowNodeName: string;
  flowNodeType: string;
  flowNodeIdPrev: number;
  nodeVars: string;
  flowNodeHandleStatus: number;
  behaviorDefId: string;
}
