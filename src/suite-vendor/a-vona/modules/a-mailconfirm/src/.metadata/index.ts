/* eslint-disable */
import type { TypeControllerOptionsActions } from 'vona-module-a-openapi';
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
/** cacheRedis: begin */
export * from '../bean/cacheRedis.emailConfirm.ts';

import { type IDecoratorCacheRedisOptions } from 'vona-module-a-cache';
declare module 'vona-module-a-cache' {
  
    export interface ICacheRedisRecord {
      'a-mailconfirm:emailConfirm': IDecoratorCacheRedisOptions;
    }

  
}
declare module 'vona-module-a-mailconfirm' {
  
        export interface CacheRedisEmailConfirm {
          /** @internal */
          get scope(): ScopeModuleAMailconfirm;
        }

          export interface CacheRedisEmailConfirm {
            get $beanFullName(): 'a-mailconfirm.cacheRedis.emailConfirm';
            get $onionName(): 'a-mailconfirm:emailConfirm';
          } 
}
/** cacheRedis: end */
/** cacheRedis: begin */
import type { CacheRedisEmailConfirm } from '../bean/cacheRedis.emailConfirm.ts';
export interface IModuleCacheRedis {
  'emailConfirm': CacheRedisEmailConfirm;
}
/** cacheRedis: end */
/** event: begin */
export * from '../bean/event.emailConfirmCallback.ts';

import 'vona';
declare module 'vona' {
  
  
}
declare module 'vona-module-a-mailconfirm' {
  
        export interface EventEmailConfirmCallback {
          /** @internal */
          get scope(): ScopeModuleAMailconfirm;
        }

          export interface EventEmailConfirmCallback {
            get $beanFullName(): 'a-mailconfirm.event.emailConfirmCallback';
            get $onionName(): 'a-mailconfirm:emailConfirmCallback';
          } 
}
/** event: end */
/** event: begin */
import type { EventEmailConfirmCallback } from '../bean/event.emailConfirmCallback.ts';
export interface IModuleEvent {
  'emailConfirmCallback': EventEmailConfirmCallback;
}
/** event: end */
/** event: begin */
import type { TypeEventEmailConfirmCallbackData, TypeEventEmailConfirmCallbackResult } from '../bean/event.emailConfirmCallback.ts';
import type { EventOn } from 'vona-module-a-event'; 
declare module 'vona-module-a-event' {
  export interface IEventRecord {
    'a-mailconfirm:emailConfirmCallback': EventOn<TypeEventEmailConfirmCallbackData, TypeEventEmailConfirmCallbackResult>;
  }
}
/** event: end */
/** controller: begin */
export * from '../controller/mail.ts';
import type { IControllerOptionsMail } from '../controller/mail.ts';
import 'vona';
declare module 'vona-module-a-web' {
  
    export interface IControllerRecord {
      'a-mailconfirm:mail': IControllerOptionsMail;
    }

  
}
declare module 'vona-module-a-mailconfirm' {
  
        export interface ControllerMail {
          /** @internal */
          get scope(): ScopeModuleAMailconfirm;
        }

          export interface ControllerMail {
            get $beanFullName(): 'a-mailconfirm.controller.mail';
            get $onionName(): 'a-mailconfirm:mail';
          } 
}
/** controller: end */
/** controller: begin */
// @ts-ignore ignore
import type { ControllerMail } from '../controller/mail.ts';
declare module 'vona-module-a-mailconfirm' {
  
    export interface IControllerOptionsMail {
      actions?: TypeControllerOptionsActions<ControllerMail>;
    }
}
declare module 'vona-module-a-web' {
  export interface IApiPathGetRecord{
        '/mailconfirm/mail/emailConfirmCallback': undefined;
'/mailconfirm/mail/passwordResetCallback': undefined;
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
export class ScopeModuleAMailconfirm extends BeanScopeBase {}

export interface ScopeModuleAMailconfirm {
  util: BeanScopeUtil;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
service: IModuleService;
cacheRedis: IModuleCacheRedis;
event: IModuleEvent;
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
