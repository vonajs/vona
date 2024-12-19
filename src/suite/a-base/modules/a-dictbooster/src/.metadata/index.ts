/** beans: begin */
export * from '../bean/version.manager.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-dictbooster.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-dictbooster' {
  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleADictbooster;
  }
}
/** beans: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** locale: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil, TypeModuleLocales, TypeLocaleBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleADictbooster extends BeanScopeBase {}

export interface ScopeModuleADictbooster {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-dictbooster': ScopeModuleADictbooster;
  }

  export interface IBeanScopeContainer {
    dictbooster: ScopeModuleADictbooster;
  }

  export interface IBeanScopeLocale {
    'a-dictbooster': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-dictbooster:${K}` {
  return `a-dictbooster:${key}`;
}
/** scope: end */
