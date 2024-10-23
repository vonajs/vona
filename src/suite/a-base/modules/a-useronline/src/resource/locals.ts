export * from '../local/userOnline.js';

import { LocalUserOnline } from '../local/userOnline.js';

export interface IModuleService {
  userOnline: LocalUserOnline;
}
