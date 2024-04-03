export * from '../local/version.js';
export * from '../local/database.js';

import { LocalVersion } from '../local/version.js';
import { LocalDatabase } from '../local/database.js';

export interface IModuleLocal {
  version: LocalVersion;
  database: LocalDatabase;
}
