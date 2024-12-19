/** beans: begin */
export * from '../bean/version.manager.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-dictarea.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-dictarea' {
  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleADictarea;
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
export class ScopeModuleADictarea extends BeanScopeBase {}

export interface ScopeModuleADictarea {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-dictarea': ScopeModuleADictarea;
  }

  export interface IBeanScopeContainer {
    dictarea: ScopeModuleADictarea;
  }

  export interface IBeanScopeLocale {
    'a-dictarea': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-dictarea:${K}` {
  return `a-dictarea:${key}`;
}
/** scope: end */
