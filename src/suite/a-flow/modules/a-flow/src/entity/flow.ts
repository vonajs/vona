import { TableIdentity } from 'vona';
import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityFlow extends EntityBaseTemp {
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
