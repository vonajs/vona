import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aDashboardContent')
export class EntityDashboardContent extends EntityItemBase {
  itemId: number;
  content: string;
}
