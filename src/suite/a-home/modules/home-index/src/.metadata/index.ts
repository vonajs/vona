/** startup: begin */
export * from '../bean/startup.outputHomeApi.js';

import { IDecoratorStartupOptions } from 'vona-module-a-startup';
declare module 'vona-module-a-startup' {
  export interface IStartupRecord {
    'home-index:outputHomeApi': IDecoratorStartupOptions;
  }
}
declare module 'vona-module-home-index' {
  export interface StartupOutputHomeApi {
    /** @internal */
    get scope(): ScopeModuleHomeIndex;
  }
}
/** startup: end */
/** controller: begin */
export * from '../controller/home.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
  export interface IControllerRecord {
    'home-index:home': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-home-index' {
  export interface ControllerHome {
    /** @internal */
    get scope(): ScopeModuleHomeIndex;
  }
}
/** controller: end */
/** controller: begin */
declare module 'vona-module-a-web' {
  export interface IApiPathGetRecord {
    '//': '//';
  }
}
/** controller: end */
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

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `home-index::${K}` {
  return `home-index::${key}`;
}
/** scope: end */
