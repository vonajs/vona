import eventAccountMigration from './bean/event.accountMigration.js';
import smsProviderTest from './bean/sms.provider.test.js';
import smsProviderAliyun from './bean/sms.provider.aliyun.js';
import captchaProvider from './bean/captcha.provider.captcha.js';
import authProviderSms from './bean/auth.provider.sms.js';
import broadcastSmsProviderChanged from './bean/broadcast.smsProviderChanged.js';
import startupCacheSmsProviders from './bean/startup.cacheSmsProviders.js';
import beanSmsProviderCache from './bean/bean.smsProviderCache.js';

export default {
  // event
  'event.accountMigration': {
    bean: eventAccountMigration,
  },
  // sms.provider
  'sms.provider.test': {
    bean: smsProviderTest,
  },
  'sms.provider.aliyun': {
    bean: smsProviderAliyun,
  },
  // captcha.provider
  'captcha.provider.captcha': {
    bean: captchaProvider,
  },
  // auth.provider
  'auth.provider.sms': {
    bean: authProviderSms,
  },
  // broadcast
  'broadcast.smsProviderChanged': {
    bean: broadcastSmsProviderChanged,
  },
  // startup
  'startup.cacheSmsProviders': {
    bean: startupCacheSmsProviders,
  },
  // global
  smsProviderCache: {
    bean: beanSmsProviderCache,
    global: true,
  },
};
