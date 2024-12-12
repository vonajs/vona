/** beans: begin */
export * from '../bean/bean.authProvider.js';
export * from '../bean/bean.authProviderBase_.js';
export * from '../bean/bean.authProviderCache.js';
export * from '../bean/broadcast.authProviderChanged.js';
export * from '../bean/version.manager.js';
import { BeanAuthProvider } from '../bean/bean.authProvider.js';
import { BeanAuthProviderBase } from '../bean/bean.authProviderBase_.js';
import { BeanAuthProviderCache } from '../bean/bean.authProviderCache.js';
import { BroadcastAuthProviderChanged } from '../bean/broadcast.authProviderChanged.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    authProvider: BeanAuthProvider;
    authProviderCache: BeanAuthProviderCache;
  }

  export interface IBeanRecordGeneral {
    authProviderBase: BeanAuthProviderBase;
    'a-auth.broadcast.authProviderChanged': BroadcastAuthProviderChanged;
    'a-auth.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-auth' {
  export interface BeanAuthProvider {
    get scope(): ScopeModuleAAuth;
  }

  export interface BeanAuthProviderCache {
    get scope(): ScopeModuleAAuth;
  }

  export interface BroadcastAuthProviderChanged {
    get scope(): ScopeModuleAAuth;
  }

  export interface VersionManager {
    get scope(): ScopeModuleAAuth;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/auth.js';
export * from '../entity/authProvider.js';

import { IDecoratorEntityOptions } from 'vona';
declare module 'vona' {
  export interface IEntityRecord {
    'a-auth:auth': IDecoratorEntityOptions;
    'a-auth:authProvider': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-auth' {}
/** entity: end */
/** model: begin */
export * from '../model/auth.js';
export * from '../model/authProvider.js';

import { IDecoratorModelOptions } from 'vona';
declare module 'vona' {
  export interface IModelRecord {
    'a-auth:auth': IDecoratorModelOptions;
    'a-auth:authProvider': IDecoratorModelOptions;
  }
}
declare module 'vona-module-a-auth' {
  export interface ModelAuth {
    get scope(): ScopeModuleAAuth;
  }

  export interface ModelAuthProvider {
    get scope(): ScopeModuleAAuth;
  }
}
/** model: end */
/** meta: begin */
export * from '../bean/meta.redlock.js';

import 'vona';
declare module 'vona' {
  export interface IMetaRecord {
    'a-auth:redlock': never;
  }
}
declare module 'vona-module-a-auth' {
  export interface MetaRedlock {
    get scope(): ScopeModuleAAuth;
  }
}
/** meta: end */
/** startup: begin */
export * from '../bean/startup.cacheAuthProviders.js';
export * from '../bean/startup.registerPassport.js';
export * from '../bean/startup.registerRouters.js';

import { IDecoratorStartupOptions } from 'vona';
declare module 'vona' {
  export interface IStartupRecord {
    'a-auth:cacheAuthProviders': IDecoratorStartupOptions;
    'a-auth:registerPassport': IDecoratorStartupOptions;
    'a-auth:registerRouters': IDecoratorStartupOptions;
  }
}
declare module 'vona-module-a-auth' {
  export interface StartupCacheAuthProviders {
    get scope(): ScopeModuleAAuth;
  }

  export interface StartupRegisterPassport {
    get scope(): ScopeModuleAAuth;
  }

  export interface StartupRegisterRouters {
    get scope(): ScopeModuleAAuth;
  }
}
/** startup: end */
/** meta redlock: begin */
import { MetaRedlock } from '../bean/meta.redlock.js';
/** meta redlock: end */
/** entities: begin */
import { EntityAuth } from '../entity/auth.js';
import { EntityAuthProvider } from '../entity/authProvider.js';
export interface IModuleEntity {
  auth: EntityAuth;
  authProvider: EntityAuthProvider;
}
declare module 'vona-module-a-auth' {
  export interface EntityAuth {
    column: <K extends keyof Omit<EntityAuth, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityAuth, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityAuthProvider {
    column: <K extends keyof Omit<EntityAuthProvider, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityAuthProvider, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entities: end */
/** models: begin */
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
declare module 'vona-module-a-auth' {
  export interface ServicePassport {
    get scope(): ScopeModuleAAuth;
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
import {
  BeanScopeBase,
  Scope,
  TypeModuleBean,
  BeanScopeUtil,
  TypeModuleConfig,
  TypeModuleLocales,
  TypeLocaleBase,
} from 'vona';

@Scope()
export class ScopeModuleAAuth extends BeanScopeBase {}

export interface ScopeModuleAAuth {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  redlock: MetaRedlock;
  service: IModuleService;
  model: IModuleModel;
  entity: IModuleEntity;
  queue: IModulequeue;
}

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
