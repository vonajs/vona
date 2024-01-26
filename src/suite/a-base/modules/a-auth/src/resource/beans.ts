export * from '../bean/virtual.authProviderBase.js';
export * from '../bean/version.manager.js';
export * from '../bean/startup.registerRouters.js';
export * from '../bean/startup.registerPassport.js';
export * from '../bean/startup.cacheAuthProviders.js';
export * from '../bean/broadcast.authProviderChanged.js';
export * from '../bean/bean.authProviderCache.js';
export * from '../bean/bean.authProvider.js';

import { BeanAuthProviderCache } from '../bean/bean.authProviderCache.js';
import { BeanAuthProvider } from '../bean/bean.authProvider.js';

declare module '@cabloy/core' {
  export interface IBeanRecord {
    authProviderCache: BeanAuthProviderCache;
    authProvider: BeanAuthProvider;
  }
}
