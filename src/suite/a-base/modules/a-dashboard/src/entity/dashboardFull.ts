import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aDashboardViewFull')
export class EntityDashboardFull extends EntityItemBase {
  description: string;
  content: string;
}
