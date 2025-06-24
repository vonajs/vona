/* eslint-disable */
import type { TypeControllerOptionsActions } from 'vona-module-a-openapi';
/** meta: begin */
export * from '../bean/meta.printTip.ts';

import 'vona';
declare module 'vona' {
  
    export interface IMetaRecord {
      'home-index:printTip': never;
    }

  
}
declare module 'vona-module-home-index' {
  
        export interface MetaPrintTip {
          /** @internal */
          get scope(): ScopeModuleHomeIndex;
        } 
}
/** meta: end */
/** controller: begin */
export * from '../controller/home.ts';
import type { IControllerOptionsHome } from '../controller/home.ts';
import 'vona';
declare module 'vona-module-a-web' {
  
    export interface IControllerRecord {
      'home-index:home': IControllerOptionsHome;
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
// @ts-ignore ignore
import type { ControllerHome } from '../controller/home.ts';
declare module 'vona-module-home-index' {
  
    export interface IControllerOptionsHome {
      actions?: TypeControllerOptionsActions<ControllerHome>;
    }
}
declare module 'vona-module-a-web' {
  export interface IApiPathGetRecord{
        '//': undefined;
    }

}
/** controller: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.ts';
import locale_zh_cn from '../config/locale/zh-cn.ts';
export const locales = {
  'en-us': locale_en_us,
'zh-cn': locale_zh_cn,
};
/** locale: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, type TypeModuleLocales, type TypeLocaleBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleHomeIndex extends BeanScopeBase {}

export interface ScopeModuleHomeIndex {
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

export function $locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `home-index::${K}` {
  return `home-index::${key}`;
}
/** scope: end */
