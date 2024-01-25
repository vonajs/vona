export * from '../local/status.js';

import { LocalStatus } from '../local/status.js';

export interface IModuleLocal {
  status: LocalStatus;
}
