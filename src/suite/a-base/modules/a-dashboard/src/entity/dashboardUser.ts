import {} from '@cabloy/core';

export interface EntityDashboardUser extends EntityBase {
  userId: number;
  dashboardDefault: number;
  dashboardAtomId: number;
  dashboardName: string;
  content: string;
}
