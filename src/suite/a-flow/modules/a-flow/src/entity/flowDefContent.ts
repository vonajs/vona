import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aFlowDefContent')
export class EntityFlowDefContent extends EntityItemBase {
  itemId: number;
  content: string;
}
