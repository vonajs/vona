export * from '../local/sessionStore.js';

import { LocalSessionStore } from '../local/sessionStore.js';

export interface IModuleLocal {
  sessionStore: LocalSessionStore;
}
