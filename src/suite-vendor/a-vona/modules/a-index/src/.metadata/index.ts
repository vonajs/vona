/** config: end */
/** scope: begin */
import type { BeanScopeUtil } from 'vona';
import type { TypeModuleConfig } from 'vona';
import type { config } from '../config/config.js';
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** meta: begin */
import 'vona';

import 'vona';

export * from '../bean/meta.version.js';
declare module 'vona' {
  export interface IMetaRecord {
    'a-index:version': never;
  }
}
declare module 'vona-module-a-index' {
  export interface MetaVersion {
    /** @internal */
    get scope(): ScopeModuleAIndex;
  }
}
/** meta: end */
/** config: begin */
export * from '../config/config.js';

@Scope()
export class ScopeModuleAIndex extends BeanScopeBase {}

export interface ScopeModuleAIndex {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-index': ScopeModuleAIndex;
  }

  export interface IBeanScopeContainer {
    index: ScopeModuleAIndex;
  }

  export interface IBeanScopeConfig {
    'a-index': ReturnType<typeof config>;
  }
}

/** scope: end */
