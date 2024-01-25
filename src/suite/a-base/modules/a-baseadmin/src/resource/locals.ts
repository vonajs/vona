export * from '../local/role.js';
export * from '../local/user.js';
export * from '../local/atomRight.js';
export * from '../local/resourceRight.js';
export * from '../local/auth.js';
export * from '../local/authScene.js';

import { LocalRole } from '../local/role.js';
import { LocalUser } from '../local/user.js';
import { LocalAtomRight } from '../local/atomRight.js';
import { LocalResourceRight } from '../local/resourceRight.js';
import { LocalAuth } from '../local/auth.js';
import { LocalAuthScene } from '../local/authScene.js';

export interface IModuleLocal {
  role: LocalRole;
  user: LocalUser;
  atomRight: LocalAtomRight;
  resourceRight: LocalResourceRight;
  auth: LocalAuth;
  authScene: LocalAuthScene;
}
