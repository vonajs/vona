export * from '../local/db.js';

import { LocalDb } from '../local/db.js';

export interface IModuleLocal {
  db: LocalDb;
}
