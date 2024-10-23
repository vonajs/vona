export * from '../local/dashboard.js';

import { LocalDashboard } from '../local/dashboard.js';

export interface IModuleService {
  dashboard: LocalDashboard;
}
