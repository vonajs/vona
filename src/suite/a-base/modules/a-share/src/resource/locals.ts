export * from '../local/share.js';

import { LocalShare } from '../local/share.js';

export interface IModuleService {
  share: LocalShare;
}
