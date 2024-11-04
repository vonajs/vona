import { TableIdentity } from 'vona';
import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityFlowHistory extends EntityBaseTemp {
  flowId: number;
  flowDefId: number;
  flowDefKey: string;
  flowDefRevision: number;
  flowName: string;
  flowStatus: number;
  flowAtomId: TableIdentity;
  flowVars: string;
  flowNodeIdCurrent: number;
  flowNodeNameCurrent: string;
  flowUserId: number;
  timeEnd: Date;
  flowRemark: string;
  flowHandleStatus: number;
  flowAtomClassId: number;
}
