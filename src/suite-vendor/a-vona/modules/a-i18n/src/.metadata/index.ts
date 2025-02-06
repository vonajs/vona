/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** main: begin */
export * from '../main.js';
/** main: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil, TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAI18n extends BeanScopeBase {}

export interface ScopeModuleAI18n {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-i18n': ScopeModuleAI18n;
  }

  export interface IBeanScopeContainer {
    i18n: ScopeModuleAI18n;
  }

  export interface IBeanScopeConfig {
    'a-i18n': ReturnType<typeof config>;
  }
}

/** scope: end */
