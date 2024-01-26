export * from '../local/utils.js';
export * from '../local/tools.js';

import { LocalUtils } from '../local/utils.js';
import { LocalTools } from '../local/tools.js';

export interface IModuleLocal {
  utils: LocalUtils;
  tools: LocalTools;
}
