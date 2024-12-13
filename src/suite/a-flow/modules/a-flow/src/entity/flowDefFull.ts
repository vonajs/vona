import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aFlowDefViewFull')
export class EntityFlowDefFull extends EntityItemBase {
  description: string;
  content: string;
}
