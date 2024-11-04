import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityFlowNodeHistory extends EntityBaseTemp {
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
