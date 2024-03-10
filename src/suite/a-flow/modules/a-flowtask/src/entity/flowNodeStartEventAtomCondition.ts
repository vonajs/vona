import { EntityBase } from '@cabloy/core';

export interface EntityFlowNodeStartEventAtomCondition extends EntityBase {
  flowDefId: number;
  startEventId: string;
  atomClassId: number;
  conditionExpression: string;
}
