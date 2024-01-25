export * from '../model/dashboard.js';
export * from '../model/dashboardContent.js';
export * from '../model/dashboardUser.js';
export * from '../model/dashboardFull.js';

import { ModelDashboard } from '../model/dashboard.js';
import { ModelDashboardContent } from '../model/dashboardContent.js';
import { ModelDashboardUser } from '../model/dashboardUser.js';
import { ModelDashboardFull } from '../model/dashboardFull.js';

export interface IModuleModel {
  dashboard: ModelDashboard;
  dashboardContent: ModelDashboardContent;
  dashboardUser: ModelDashboardUser;
  dashboardFull: ModelDashboardFull;
}
