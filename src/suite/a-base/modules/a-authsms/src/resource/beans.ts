export * from '../bean/startup.cacheSmsProviders.js';
export * from '../bean/sms.provider.test.js';
export * from '../bean/sms.provider.aliyun.js';
export * from '../bean/event.accountMigration.js';
export * from '../bean/captcha.provider.captcha.js';
export * from '../bean/broadcast.smsProviderChanged.js';
export * from '../bean/bean.smsProviderCache.js';
export * from '../bean/auth.provider.sms.js';

import { BeanSmsProviderCache } from '../bean/bean.smsProviderCache.js';

declare module 'vona' {
  export interface IBeanRecord {
    smsProviderCache: BeanSmsProviderCache;
  }
}
