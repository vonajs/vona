import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityFlowNodeStartEventAtomCondition extends EntityBaseTemp {
  flowDefId: number;
  startEventId: string;
  atomClassId: number;
  conditionExpression: string;
}
