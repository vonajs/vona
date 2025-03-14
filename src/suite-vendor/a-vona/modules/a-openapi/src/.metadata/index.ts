import type { BeanScopeUtil, TypeLocaleBase, TypeModuleConfig, TypeModuleLocales } from 'vona';
import type { config } from '../config/config.ts';
/** service: end */
/** service: begin */

/** service: end */
/** service: begin */
import type { ServiceOpenapi } from '../service/openapi.ts';
/** main: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** config: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.ts';
import locale_zh_cn from '../config/locale/zh-cn.ts';
/** service: end */
/** config: begin */
import 'vona';
import 'vona';

import 'vona';

export * from '../config/config.ts';
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
export interface IModuleService {
  openapi: ServiceOpenapi;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-openapi.service.openapi': ServiceOpenapi;
  }
}
/** locale: end */
/** main: begin */
export * from '../main.ts';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** service: begin */
export * from '../service/openapi.ts';

@Scope()
export class ScopeModuleAOpenapi extends BeanScopeBase {}

export interface ScopeModuleAOpenapi {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  service: IModuleService;
}

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

export function $locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-openapi::${K}` {
  return `a-openapi::${key}`;
}
/** scope: end */
