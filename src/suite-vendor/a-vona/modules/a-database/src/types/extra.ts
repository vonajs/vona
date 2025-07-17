import type { ScopeModuleADatabase } from '../.metadata/index.ts';

declare module 'vona-module-a-database' {
  export interface ServiceDb {
    /** @internal */
    get scope(): ScopeModuleADatabase;
  }
}
