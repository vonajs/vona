/** beans: begin */
export * from '../bean/bean.authProvider.js';
export * from '../bean/bean.authProviderBase_.js';
export * from '../bean/bean.authProviderCache.js';
export * from '../bean/broadcast.authProviderChanged.js';
export * from '../bean/startup.cacheAuthProviders.js';
export * from '../bean/startup.registerPassport.js';
export * from '../bean/startup.registerRouters.js';
export * from '../bean/version.manager.js';
import { BeanAuthProvider } from '../bean/bean.authProvider.js';
import { BeanAuthProviderCache } from '../bean/bean.authProviderCache.js';
import { BroadcastAuthProviderChanged } from '../bean/broadcast.authProviderChanged.js';
import { StartupCacheAuthProviders } from '../bean/startup.cacheAuthProviders.js';
import { StartupRegisterPassport } from '../bean/startup.registerPassport.js';
import { StartupRegisterRouters } from '../bean/startup.registerRouters.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    authProvider: BeanAuthProvider;
    authProviderCache: BeanAuthProviderCache;
  }

  export interface IBeanRecordGeneral {
    'a-auth.broadcast.authProviderChanged': BroadcastAuthProviderChanged;
    'a-auth.startup.cacheAuthProviders': StartupCacheAuthProviders;
    'a-auth.startup.registerPassport': StartupRegisterPassport;
    'a-auth.startup.registerRouters': StartupRegisterRouters;
    'a-auth.version.manager': VersionManager;
  }
}
/** beans: end */
/** entities: begin */
export * from '../entity/auth.js';
export * from '../entity/authProvider.js';
/** entities: end */
/** models: begin */
export * from '../model/auth.js';
export * from '../model/authProvider.js';
import { ModelAuth } from '../model/auth.js';
import { ModelAuthProvider } from '../model/authProvider.js';
export interface IModuleModel {
  auth: ModelAuth;
  authProvider: ModelAuthProvider;
}
/** models: end */
/** services: begin */
export * from '../service/passport.js';
import { ServicePassport } from '../service/passport.js';
export interface IModuleService {
  passport: ServicePassport;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-auth.service.passport': ServicePassport;
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
/** scope: begin */
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAAuth extends BeanScopeBase {}

export interface ScopeModuleAAuth
  extends TypeModuleResource<
    typeof config,
    never,
    (typeof locales)[TypeLocaleBase],
    never,
    IModuleService,
    IModuleModel
  > {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-auth': ScopeModuleAAuth;
  }

  export interface IBeanScopeContainer {
    auth: ScopeModuleAAuth;
  }

  export interface IBeanScopeConfig {
    'a-auth': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-auth': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-auth:${K}` {
  return `a-auth:${key}`;
}
/** scope: end */
