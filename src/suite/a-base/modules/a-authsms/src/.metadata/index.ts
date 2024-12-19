/** beans: begin */
export * from '../bean/auth.provider.sms.js';
export * from '../bean/captcha.provider.captcha.js';
export * from '../bean/sms.provider.aliyun.js';
export * from '../bean/sms.provider.test.js';
import { AuthProviderSms } from '../bean/auth.provider.sms.js';
import { CaptchaProviderCaptcha } from '../bean/captcha.provider.captcha.js';
import { SmsProviderAliyun } from '../bean/sms.provider.aliyun.js';
import { SmsProviderTest } from '../bean/sms.provider.test.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-authsms.auth.provider.sms': AuthProviderSms;
    'a-authsms.captcha.provider.captcha': CaptchaProviderCaptcha;
    'a-authsms.sms.provider.aliyun': SmsProviderAliyun;
    'a-authsms.sms.provider.test': SmsProviderTest;
  }
}
declare module 'vona-module-a-authsms' {
  export interface AuthProviderSms {
    /** @internal */
    get scope(): ScopeModuleAAuthsms;
  }

  export interface CaptchaProviderCaptcha {
    /** @internal */
    get scope(): ScopeModuleAAuthsms;
  }

  export interface SmsProviderAliyun {
    /** @internal */
    get scope(): ScopeModuleAAuthsms;
  }

  export interface SmsProviderTest {
    /** @internal */
    get scope(): ScopeModuleAAuthsms;
  }
}
/** beans: end */
/** bean: begin */
export * from '../bean/bean.smsProviderCache.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-authsms' {
  export interface BeanSmsProviderCache {
    /** @internal */
    get scope(): ScopeModuleAAuthsms;
  }
}
/** bean: end */
/** bean: begin */
import { BeanSmsProviderCache } from '../bean/bean.smsProviderCache.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    smsProviderCache: BeanSmsProviderCache;
  }
}
/** bean: end */
/** broadcast: begin */
export * from '../bean/broadcast.smsProviderChanged.js';

import { IDecoratorBroadcastOptions } from 'vona-module-a-broadcast';
declare module 'vona-module-a-broadcast' {
  export interface IBroadcastRecord {
    'a-authsms:smsProviderChanged': IDecoratorBroadcastOptions;
  }
}
declare module 'vona-module-a-authsms' {
  export interface BroadcastSmsProviderChanged {
    /** @internal */
    get scope(): ScopeModuleAAuthsms;
  }
}
/** broadcast: end */
/** broadcast: begin */
import { BroadcastSmsProviderChanged } from '../bean/broadcast.smsProviderChanged.js';
export interface IModuleBroadcast {
  smsProviderChanged: BroadcastSmsProviderChanged;
}
/** broadcast: end */
/** eventListener: begin */
export * from '../bean/eventListener.accountMigration.js';

import { IDecoratorEventListenerOptions } from 'vona-module-a-event';
declare module 'vona-module-a-event' {
  export interface IEventListenerRecord {
    'a-authsms:accountMigration': IDecoratorEventListenerOptions;
  }
}
declare module 'vona-module-a-authsms' {
  export interface EventListenerAccountMigration {
    /** @internal */
    get scope(): ScopeModuleAAuthsms;
  }
}
/** eventListener: end */
/** meta: begin */
export * from '../bean/meta.status.js';

import 'vona';
declare module 'vona' {
  export interface IMetaRecord {
    'a-authsms:status': never;
  }
}
declare module 'vona-module-a-authsms' {
  export interface MetaStatus {
    /** @internal */
    get scope(): ScopeModuleAAuthsms;
  }
}
/** meta: end */
/** meta status: begin */
import { MetaStatus } from '../bean/meta.status.js';
/** meta status: end */
/** startup: begin */
export * from '../bean/startup.cacheSmsProviders.js';

import { IDecoratorStartupOptions } from 'vona-module-a-startup';
declare module 'vona-module-a-startup' {
  export interface IStartupRecord {
    'a-authsms:cacheSmsProviders': IDecoratorStartupOptions;
  }
}
declare module 'vona-module-a-authsms' {
  export interface StartupCacheSmsProviders {
    /** @internal */
    get scope(): ScopeModuleAAuthsms;
  }
}
/** startup: end */
/** service: begin */
export * from '../service/auth.js';
export * from '../service/captcha.js';
export * from '../service/smsProvider.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-authsms:auth': never;
    'a-authsms:captcha': never;
    'a-authsms:smsProvider': never;
  }
}
declare module 'vona-module-a-authsms' {
  export interface ServiceAuth {
    /** @internal */
    get scope(): ScopeModuleAAuthsms;
  }

  export interface ServiceCaptcha {
    /** @internal */
    get scope(): ScopeModuleAAuthsms;
  }

  export interface ServiceSmsProvider {
    /** @internal */
    get scope(): ScopeModuleAAuthsms;
  }
}
/** service: end */
/** service: begin */
import { ServiceAuth } from '../service/auth.js';
import { ServiceCaptcha } from '../service/captcha.js';
import { ServiceSmsProvider } from '../service/smsProvider.js';
export interface IModuleService {
  auth: ServiceAuth;
  captcha: ServiceCaptcha;
  smsProvider: ServiceSmsProvider;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-authsms.service.auth': ServiceAuth;
    'a-authsms.service.captcha': ServiceCaptcha;
    'a-authsms.service.smsProvider': ServiceSmsProvider;
  }
}
/** service: end */
/** controller: begin */
export * from '../controller/auth.js';
export * from '../controller/captcha.js';
export * from '../controller/smsProvider.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
  export interface IControllerRecord {
    'a-authsms:auth': IDecoratorControllerOptions;
    'a-authsms:captcha': IDecoratorControllerOptions;
    'a-authsms:smsProvider': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-authsms' {
  export interface ControllerAuth {
    /** @internal */
    get scope(): ScopeModuleAAuthsms;
  }

  export interface ControllerCaptcha {
    /** @internal */
    get scope(): ScopeModuleAAuthsms;
  }

  export interface ControllerSmsProvider {
    /** @internal */
    get scope(): ScopeModuleAAuthsms;
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
/** error: begin */
export * from '../config/errors.js';
import { Errors } from '../config/errors.js';
/** error: end */
/** scope: begin */
import {
  BeanScopeBase,
  TypeModuleBean,
  BeanScopeUtil,
  TypeModuleConfig,
  TypeModuleErrors,
  TypeModuleLocales,
  TypeLocaleBase,
} from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAAuthsms extends BeanScopeBase {}

export interface ScopeModuleAAuthsms {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  error: TypeModuleErrors<typeof Errors>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  broadcast: IModuleBroadcast;
  status: MetaStatus;
  service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-authsms': ScopeModuleAAuthsms;
  }

  export interface IBeanScopeContainer {
    authsms: ScopeModuleAAuthsms;
  }

  export interface IBeanScopeConfig {
    'a-authsms': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-authsms': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-authsms:${K}` {
  return `a-authsms:${key}`;
}
/** scope: end */
