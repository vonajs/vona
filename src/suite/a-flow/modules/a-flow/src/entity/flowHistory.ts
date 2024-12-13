import { TableIdentity } from 'vona-module-a-database';
import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aFlowHistory')
export class EntityFlowHistory extends EntityBaseTemp {
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
