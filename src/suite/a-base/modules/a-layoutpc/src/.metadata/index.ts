/** beans: begin */
export * from '../bean/version.manager.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-layoutpc.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-layoutpc' {
  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleALayoutpc;
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
export class ScopeModuleALayoutpc extends BeanScopeBase {}

export interface ScopeModuleALayoutpc {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-layoutpc': ScopeModuleALayoutpc;
  }

  export interface IBeanScopeContainer {
    layoutpc: ScopeModuleALayoutpc;
  }

  export interface IBeanScopeLocale {
    'a-layoutpc': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-layoutpc:${K}` {
  return `a-layoutpc:${key}`;
}
/** scope: end */
