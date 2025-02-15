/** service: begin */
export * from '../service/openapi.js';

import 'vona';
declare module 'vona-module-a-web' {
  export interface IServiceRecord {
    'a-openapi:openapi': never;
  }
}
declare module 'vona-module-a-openapi' {
  export interface ServiceOpenapi {
    /** @internal */
    get scope(): ScopeModuleAOpenapi;
  }
}
/** service: end */
/** service: begin */
import type { ServiceOpenapi } from '../service/openapi.js';
export interface IModuleService {
  openapi: ServiceOpenapi;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-openapi.service.openapi': ServiceOpenapi;
  }
}
/** service: end */
/** config: begin */
export * from '../config/config.js';
import type { config } from '../config/config.js';
/** config: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** locale: end */
/** main: begin */
export * from '../main.js';
/** main: end */
/** scope: begin */
import type { BeanScopeUtil } from 'vona';
import { BeanScopeBase, type TypeModuleConfig, type TypeModuleLocales, type TypeLocaleBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAOpenapi extends BeanScopeBase {}

export interface ScopeModuleAOpenapi {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-openapi': ScopeModuleAOpenapi;
  }

  export interface IBeanScopeContainer {
    openapi: ScopeModuleAOpenapi;
  }

  export interface IBeanScopeConfig {
    'a-openapi': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-openapi': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-openapi::${K}` {
  return `a-openapi::${key}`;
}
/** scope: end */
