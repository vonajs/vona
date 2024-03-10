import { EntityBase } from '@cabloy/core';

export interface EntityFlowTaskHistory extends EntityBase {
  flowId: number;
  flowTaskId: number;
  flowNodeId: number;
  flowTaskStatus: number;
  flowTaskHidden: number;
  userIdAssignee: number;
  specificFlag: number;
  handleStatus: number;
  handleRemark: string;
  timeClaimed: Date;
  timeHandled: Date;
  taskVars: string;
  ignoreMark: number;
  flowTaskIdForwardFrom: number;
  flowTaskIdForwardTo: number;
  flowTaskIdSubstituteFrom: number;
  flowTaskIdSubstituteTo: number;
  allowViewWorkflow: number;
}
