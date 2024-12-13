import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aDashboard')
export class EntityDashboard extends EntityItemBase {
  description: string;
}
