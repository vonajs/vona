/** beans: begin */
export * from '../bean/version.manager.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-markdownblock.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-markdownblock' {
  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleAMarkdownblock;
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
export class ScopeModuleAMarkdownblock extends BeanScopeBase {}

export interface ScopeModuleAMarkdownblock {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-markdownblock': ScopeModuleAMarkdownblock;
  }

  export interface IBeanScopeContainer {
    markdownblock: ScopeModuleAMarkdownblock;
  }

  export interface IBeanScopeLocale {
    'a-markdownblock': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-markdownblock:${K}` {
  return `a-markdownblock:${key}`;
}
/** scope: end */
