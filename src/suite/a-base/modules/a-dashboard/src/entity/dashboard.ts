import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aDashboard')
export class EntityDashboard extends EntityItemBase {
  description: string;
}
