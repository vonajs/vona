export * from '../local/token.js';
export * from '../local/auth.js';
export * from '../local/authOpen.js';

import { LocalToken } from '../local/token.js';
import { LocalAuth } from '../local/auth.js';
import { LocalAuthOpen } from '../local/authOpen.js';

export interface IModuleService {
  token: LocalToken;
  auth: LocalAuth;
  authOpen: LocalAuthOpen;
}
