/* eslint-disable */
/** service: begin */
export * from '../service/openapi.ts';

import 'vona';
declare module 'vona-module-a-bean' {
  
    export interface IServiceRecord {
      'a-openapi:openapi': never;
    }

  
}
declare module 'vona-module-a-openapi' {
  
        export interface ServiceOpenapi {
          /** @internal */
          get scope(): ScopeModuleAOpenapi;
        }

          export interface ServiceOpenapi {
            get $beanFullName(): 'a-openapi.service.openapi';
            get $onionName(): 'a-openapi:openapi';
          } 
}
/** service: end */
/** service: begin */
import type { ServiceOpenapi } from '../service/openapi.ts';
export interface IModuleService {
  'openapi': ServiceOpenapi;
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
/** summerCache: begin */
export * from '../bean/summerCache.json.ts';

import { type IDecoratorSummerCacheOptions } from 'vona-module-a-summer';
declare module 'vona-module-a-summer' {
  
    export interface ISummerCacheRecord {
      'a-openapi:json': IDecoratorSummerCacheOptions;
    }

  
}
declare module 'vona-module-a-openapi' {
  
        export interface SummerCacheJson {
          /** @internal */
          get scope(): ScopeModuleAOpenapi;
        }

          export interface SummerCacheJson {
            get $beanFullName(): 'a-openapi.summerCache.json';
            get $onionName(): 'a-openapi:json';
          } 
}
/** summerCache: end */
/** summerCache: begin */
import type { SummerCacheJson } from '../bean/summerCache.json.ts';
export interface IModuleSummerCache {
  'json': SummerCacheJson;
}
/** summerCache: end */
/** config: begin */
export * from '../config/config.ts';
import type { config } from '../config/config.ts';
/** config: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.ts';
import locale_zh_cn from '../config/locale/zh-cn.ts';
export const locales = {
  'en-us': locale_en_us,
'zh-cn': locale_zh_cn,
};
/** locale: end */
/** main: begin */
export * from '../main.ts';
/** main: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, type TypeModuleConfig, type TypeModuleLocales, type TypeLocaleBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAOpenapi extends BeanScopeBase {}

export interface ScopeModuleAOpenapi {
  util: BeanScopeUtil;
config: TypeModuleConfig<typeof config>;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
service: IModuleService;
summerCache: IModuleSummerCache;
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

export function $locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-openapi::${K}` {
  return `a-openapi::${key}`;
}
/** scope: end */
