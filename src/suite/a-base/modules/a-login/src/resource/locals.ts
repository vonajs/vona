export * from '../local/auth.js';

import { LocalAuth } from '../local/auth.js';

export interface IModuleLocal {
  auth: LocalAuth;
}
