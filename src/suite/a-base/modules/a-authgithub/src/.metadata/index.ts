/** beans: begin */
export * from '../bean/auth.provider.github.js';
export * from '../bean/version.manager.js';

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}
}
/** beans: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** locale: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAAuthgithub extends BeanScopeBase {}

export interface ScopeModuleAAuthgithub
  extends TypeModuleResource<typeof config, never, (typeof locales)[TypeLocaleBase], never, never, never> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-authgithub': ScopeModuleAAuthgithub;
  }

  export interface IBeanScopeContainer {
    authgithub: ScopeModuleAAuthgithub;
  }

  export interface IBeanScopeConfig {
    'a-authgithub': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-authgithub': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
