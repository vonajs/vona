/** meta: begin */
export * from '../bean/meta.version.js';

import 'vona';
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
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil, TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAIndex extends BeanScopeBase {}

export interface ScopeModuleAIndex {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}

import 'vona';
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
