export * from '../local/status.js';

import { LocalStatus } from '../local/status.js';

export interface IModuleService {
  status: LocalStatus;
}
