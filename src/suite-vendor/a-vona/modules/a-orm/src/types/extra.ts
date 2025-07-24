import type { ScopeModuleADatabase } from '../.metadata/index.ts';

declare module 'vona-module-a-orm' {
  export interface ServiceDb {
    /** @internal */
    get scope(): ScopeModuleADatabase;
  }

  export interface ServiceDatabaseClient {
    /** @internal */
    get scope(): ScopeModuleADatabase;
  }

  export interface ServiceColumns {
    /** @internal */
    get scope(): ScopeModuleADatabase;
  }

  export interface ServiceColumnsCache {
    /** @internal */
    get scope(): ScopeModuleADatabase;
  }

}
