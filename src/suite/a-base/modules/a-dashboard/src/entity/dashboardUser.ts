import { TableIdentity } from 'vona-module-a-core';
import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityDashboardUser extends EntityBaseTemp {
  userId: number;
  dashboardDefault: number;
  dashboardAtomId: TableIdentity;
  dashboardName: string;
  content: string;
}
