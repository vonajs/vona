/* eslint-disable */
/** service: begin */
export * from '../service/mail.ts';

import 'vona';
declare module 'vona-module-a-bean' {
  
    export interface IServiceRecord {
      'a-mailconfirm:mail': never;
    }

  
}
declare module 'vona-module-a-mailconfirm' {
  
        export interface ServiceMail {
          /** @internal */
          get scope(): ScopeModuleAMailconfirm;
        }

          export interface ServiceMail {
            get $beanFullName(): 'a-mailconfirm.service.mail';
            get $onionName(): 'a-mailconfirm:mail';
          } 
}
/** service: end */
/** service: begin */
import type { ServiceMail } from '../service/mail.ts';
export interface IModuleService {
  'mail': ServiceMail;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-mailconfirm.service.mail': ServiceMail;
  }
}
/** service: end */
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
export class ScopeModuleAMailconfirm extends BeanScopeBase {}

export interface ScopeModuleAMailconfirm {
  util: BeanScopeUtil;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-mailconfirm': ScopeModuleAMailconfirm;
  }

  export interface IBeanScopeContainer {
    mailconfirm: ScopeModuleAMailconfirm;
  }
  
  

  export interface IBeanScopeLocale {
    'a-mailconfirm': (typeof locales)[TypeLocaleBase];
  }
}

export function $locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-mailconfirm::${K}` {
  return `a-mailconfirm::${key}`;
}
/** scope: end */
