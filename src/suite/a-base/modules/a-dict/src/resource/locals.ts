export * from '../local/dict.js';

import { LocalDict } from '../local/dict.js';

export interface IModuleService {
  dict: LocalDict;
}
