import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityFlowTaskHistory extends EntityBaseTemp {
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
