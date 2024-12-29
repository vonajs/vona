/** bean: begin */
export * from '../bean/bean.cacheMemBase.js';
export * from '../bean/bean.cacheMemRedis.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-cache' {}
/** bean: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil, TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleACache extends BeanScopeBase {}

export interface ScopeModuleACache {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-cache': ScopeModuleACache;
  }

  export interface IBeanScopeContainer {
    cache: ScopeModuleACache;
  }

  export interface IBeanScopeConfig {
    'a-cache': ReturnType<typeof config>;
  }
}

/** scope: end */
