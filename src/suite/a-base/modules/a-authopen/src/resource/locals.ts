export * from '../local/auth.js';
export * from '../local/authOpen.js';

import { LocalAuth } from '../local/auth.js';
import { LocalAuthOpen } from '../local/authOpen.js';

export interface IModuleLocal {
  auth: LocalAuth;
  authOpen: LocalAuthOpen;
}
