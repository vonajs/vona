import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityFlowNode extends EntityBaseTemp {
  flowId: number;
  flowNodeDefId: string;
  flowNodeName: string;
  flowNodeType: string;
  flowNodeIdPrev: number;
  nodeVars: string;
  flowNodeHandleStatus: number;
  behaviorDefId: string;
}
