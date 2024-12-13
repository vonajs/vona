import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aFlowDef')
export class EntityFlowDef extends EntityItemBase {
  description: string;
}
