import type { ScopeModuleASummer } from '../.metadata/index.js';

declare module 'vona-module-a-summer' {
  export interface ServiceLocalMem {
    /** @internal */
    get scope(): ScopeModuleASummer;
  }
}
