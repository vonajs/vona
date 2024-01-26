export * from '../local/simple.js';
export * from '../local/auth.js';

import { LocalSimple } from '../local/simple.js';
import { LocalAuth } from '../local/auth.js';

export interface IModuleLocal {
  simple: LocalSimple;
  auth: LocalAuth;
}
