/** beans: begin */
export * from '../bean/auth.provider.sms.js';
export * from '../bean/bean.smsProviderCache.js';
export * from '../bean/broadcast.smsProviderChanged.js';
export * from '../bean/captcha.provider.captcha.js';
export * from '../bean/event.accountMigration.js';
export * from '../bean/sms.provider.aliyun.js';
export * from '../bean/sms.provider.test.js';
export * from '../bean/startup.cacheSmsProviders.js';
import { AuthProviderSms } from '../bean/auth.provider.sms.js';
import { BeanSmsProviderCache } from '../bean/bean.smsProviderCache.js';
import { BroadcastSmsProviderChanged } from '../bean/broadcast.smsProviderChanged.js';
import { CaptchaProviderCaptcha } from '../bean/captcha.provider.captcha.js';
import { EventAccountMigration } from '../bean/event.accountMigration.js';
import { SmsProviderAliyun } from '../bean/sms.provider.aliyun.js';
import { SmsProviderTest } from '../bean/sms.provider.test.js';
import { StartupCacheSmsProviders } from '../bean/startup.cacheSmsProviders.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    smsProviderCache: BeanSmsProviderCache;
  }

  export interface IBeanRecordGeneral {
    'a-authsms.auth.provider.sms': AuthProviderSms;
    'a-authsms.broadcast.smsProviderChanged': BroadcastSmsProviderChanged;
    'a-authsms.captcha.provider.captcha': CaptchaProviderCaptcha;
    'a-authsms.event.accountMigration': EventAccountMigration;
    'a-authsms.sms.provider.aliyun': SmsProviderAliyun;
    'a-authsms.sms.provider.test': SmsProviderTest;
    'a-authsms.startup.cacheSmsProviders': StartupCacheSmsProviders;
  }
}
/** beans: end */
/** controllers: begin */
export * from '../controller/auth.js';
export * from '../controller/captcha.js';
export * from '../controller/smsProvider.js';
/** controllers: end */
/** services: begin */
export * from '../service/auth.js';
export * from '../service/captcha.js';
export * from '../service/smsProvider.js';
import { ServiceAuth } from '../service/auth.js';
import { ServiceCaptcha } from '../service/captcha.js';
import { ServiceSmsProvider } from '../service/smsProvider.js';
export interface IModuleService {
  auth: ServiceAuth;
  captcha: ServiceCaptcha;
  smsProvider: ServiceSmsProvider;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-authsms.service.auth': ServiceAuth;
    'a-authsms.service.captcha': ServiceCaptcha;
    'a-authsms.service.smsProvider': ServiceSmsProvider;
  }
}
/** services: end */
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
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAAuthsms extends BeanScopeBase {}

export interface ScopeModuleAAuthsms
  extends TypeModuleResource<
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    any,
    IModuleService,
    any
  > {}

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
/** scope: end */
