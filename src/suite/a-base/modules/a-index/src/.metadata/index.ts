/** meta: begin */
export * from '../bean/meta.version.js';

import 'vona';
declare module 'vona' {
  export interface IMetaRecord {
    'a-index:version': never;
  }
}
/** meta: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAIndex extends BeanScopeBase {}

export interface ScopeModuleAIndex
  extends TypeModuleResource<typeof config, never, never, never, never, never, never> {}

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
