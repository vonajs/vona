import { EntityBase, TableIdentity } from 'vona';

export interface EntityDashboardUser extends EntityBase {
  userId: number;
  dashboardDefault: number;
  dashboardAtomId: TableIdentity;
  dashboardName: string;
  content: string;
}
