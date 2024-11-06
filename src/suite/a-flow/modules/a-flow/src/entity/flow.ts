import { TableIdentity } from 'vona-module-a-core';
import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aFlow')
export class EntityFlow extends EntityBaseTemp {
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
