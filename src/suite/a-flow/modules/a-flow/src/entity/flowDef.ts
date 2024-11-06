import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aFlowDef')
export class EntityFlowDef extends EntityItemBase {
  description: string;
}
