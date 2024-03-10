import { EntityBase } from '@cabloy/core';

export interface EntityFlowNodeHistory extends EntityBase {
  flowId: number;
  flowNodeId: number;
  flowNodeDefId: string;
  flowNodeName: string;
  flowNodeType: string;
  flowNodeIdPrev: number;
  flowNodeStatus: number;
  flowNodeRemark: string;
  timeDone: Date;
  nodeVars: string;
  flowNodeHandleStatus: number;
  behaviorDefId: string;
}
