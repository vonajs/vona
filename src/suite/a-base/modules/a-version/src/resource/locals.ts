export * from '../local/a.js';
export * from '../local/b.js';
export * from '../local/version.js';

import { LocalVersion } from '../local/version.js';

export interface IModuleLocal {
  version: LocalVersion;
}
