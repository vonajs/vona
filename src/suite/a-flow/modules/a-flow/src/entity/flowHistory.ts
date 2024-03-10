import { EntityBase } from '@cabloy/core';

export interface EntityFlowHistory extends EntityBase {
  flowId: number;
  flowDefId: number;
  flowDefKey: string;
  flowDefRevision: number;
  flowName: string;
  flowStatus: number;
  flowAtomId: number;
  flowVars: string;
  flowNodeIdCurrent: number;
  flowNodeNameCurrent: string;
  flowUserId: number;
  timeEnd: Date;
  flowRemark: string;
  flowHandleStatus: number;
  flowAtomClassId: number;
}
