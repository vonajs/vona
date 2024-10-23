export * from '../local/progress.js';

import { LocalProgress } from '../local/progress.js';

export interface IModuleService {
  progress: LocalProgress;
}
