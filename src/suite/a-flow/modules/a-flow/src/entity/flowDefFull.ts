import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aFlowDefViewFull')
export class EntityFlowDefFull extends EntityItemBase {
  description: string;
  content: string;
}
