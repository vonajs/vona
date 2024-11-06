import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aFlowNodeStartEventAtomCondition')
export class EntityFlowNodeStartEventAtomCondition extends EntityBaseTemp {
  flowDefId: number;
  startEventId: string;
  atomClassId: number;
  conditionExpression: string;
}
