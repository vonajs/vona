/** controller: begin */
export * from '../controller/util.js';

import { IDecoratorControllerOptions } from 'vona';
declare module 'vona' {
  export interface IControllerRecord {
    'cms-plugincopyright:util': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-cms-plugincopyright' {
  export interface ControllerUtil {
    get scope(): ScopeModuleCmsPlugincopyright;
  }
}
/** controller: end */
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
import {
  BeanScopeBase,
  Scope,
  TypeModuleBean,
  BeanScopeUtil,
  TypeModuleConfig,
  TypeModuleLocales,
  TypeLocaleBase,
} from 'vona';

@Scope()
export class ScopeModuleCmsPlugincopyright extends BeanScopeBase {}

export interface ScopeModuleCmsPlugincopyright {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  queue: IModuleQueue;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'cms-plugincopyright': ScopeModuleCmsPlugincopyright;
  }

  export interface IBeanScopeContainer {
    cmsPlugincopyright: ScopeModuleCmsPlugincopyright;
  }

  export interface IBeanScopeConfig {
    'cms-plugincopyright': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'cms-plugincopyright': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `cms-plugincopyright:${K}` {
  return `cms-plugincopyright:${key}`;
}
/** scope: end */
