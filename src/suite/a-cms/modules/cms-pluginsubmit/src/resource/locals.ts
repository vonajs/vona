export * from '../local/tools.js';

import { LocalTools } from '../local/tools.js';

export interface IModuleService {
  tools: LocalTools;
}
