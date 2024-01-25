export * from '../local/user.js';
export * from '../local/public.js';

import { LocalUser } from '../local/user.js';
import { LocalPublic } from '../local/public.js';

export interface IModuleLocal {
  user: LocalUser;
  public2: LocalPublic;
}
