export * from '../local/passport.js';

import { LocalPassport } from '../local/passport.js';

export interface IModuleService {
  passport: LocalPassport;
}
