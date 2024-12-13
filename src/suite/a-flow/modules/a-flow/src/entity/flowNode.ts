import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aFlowNode')
export class EntityFlowNode extends EntityBaseTemp {
  flowId: number;
  flowNodeDefId: string;
  flowNodeName: string;
  flowNodeType: string;
  flowNodeIdPrev: number;
  nodeVars: string;
  flowNodeHandleStatus: number;
  behaviorDefId: string;
}
