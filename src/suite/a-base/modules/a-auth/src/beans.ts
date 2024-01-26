import versionManager from './bean/version.manager.js';
import localAuthProviderBase from './bean/local.authProviderBase.js';
import localPassport from './bean/local.passport.js';
import broadcastAuthProviderChanged from './bean/broadcast.authProviderChanged.js';
import startupRegisterPassport from './bean/startup.registerPassport.js';
import startupRegisterRouters from './bean/startup.registerRouters.js';
import startupCacheAuthProviders from './bean/startup.cacheAuthProviders.js';
import beanAuthProvider from './bean/bean.authProvider.js';
import beanAuthProviderCache from './bean/bean.authProviderCache.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // local
  'local.authProviderBase': {
    bean: localAuthProviderBase,
  },
  'local.passport': {
    bean: localPassport,
  },
  // broadcast
  'broadcast.authProviderChanged': {
    bean: broadcastAuthProviderChanged,
  },
  // startup
  'startup.registerPassport': {
    bean: startupRegisterPassport,
  },
  'startup.registerRouters': {
    bean: startupRegisterRouters,
  },
  'startup.cacheAuthProviders': {
    bean: startupCacheAuthProviders,
  },
  // global
  authProvider: {
    bean: beanAuthProvider,
    global: true,
  },
  authProviderCache: {
    bean: beanAuthProviderCache,
    global: true,
  },
};
