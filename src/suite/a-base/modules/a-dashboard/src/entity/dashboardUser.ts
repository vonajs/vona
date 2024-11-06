import { TableIdentity } from 'vona-module-a-core';
import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aDashboardUser')
export class EntityDashboardUser extends EntityBaseTemp {
  userId: number;
  dashboardDefault: number;
  dashboardAtomId: TableIdentity;
  dashboardName: string;
  content: string;
}
