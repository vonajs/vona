import { EntityBase, TableIdentity } from '@cabloy/core';

export interface EntityDashboardUser extends EntityBase {
  userId: number;
  dashboardDefault: number;
  dashboardAtomId: TableIdentity;
  dashboardName: string;
  content: string;
}
