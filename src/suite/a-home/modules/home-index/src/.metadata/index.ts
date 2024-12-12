/** controller: begin */
export * from '../controller/index.js';

import { IDecoratorControllerOptions } from 'vona';
declare module 'vona' {
  export interface IControllerRecord {
    'home-index:index': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-home-index' {
  export interface ControllerIndex {
    get scope(): ScopeModuleHomeIndex;
  }
}
/** controller: end */
/** startup: begin */
export * from '../bean/startup.outputHomeApi.js';

import { IDecoratorStartupOptions } from 'vona';
declare module 'vona' {
  export interface IStartupRecord {
    'home-index:outputHomeApi': IDecoratorStartupOptions;
  }
}
declare module 'vona-module-home-index' {
  export interface StartupOutputHomeApi {
    get scope(): ScopeModuleHomeIndex;
  }
}
/** startup: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** locale: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil, TypeModuleLocales, TypeLocaleBase } from 'vona';

@Scope()
export class ScopeModuleHomeIndex extends BeanScopeBase {}

export interface ScopeModuleHomeIndex {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'home-index': ScopeModuleHomeIndex;
  }

  export interface IBeanScopeContainer {
    homeIndex: ScopeModuleHomeIndex;
  }

  export interface IBeanScopeLocale {
    'home-index': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `home-index:${K}` {
  return `home-index:${key}`;
}
/** scope: end */
