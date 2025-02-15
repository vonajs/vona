/** main: end */
/** scope: begin */
import type { BeanScopeUtil } from 'vona';
import type { TypeModuleConfig } from 'vona';
/** config: begin */
import type { config } from '../config/config.js';
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

import 'vona';

export * from '../config/config.js';
/** config: end */
/** main: begin */
export * from '../main.js';

@Scope()
export class ScopeModuleAI18n extends BeanScopeBase {}

export interface ScopeModuleAI18n {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}
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
