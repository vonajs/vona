export * from '../local/stats.js';

import { LocalStats } from '../local/stats.js';

export interface IModuleService {
  stats: LocalStats;
}
