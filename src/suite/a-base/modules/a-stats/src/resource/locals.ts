export * from '../local/stats.js';

import { LocalStats } from '../local/stats.js';

export interface IModuleLocal {
  stats: LocalStats;
}
