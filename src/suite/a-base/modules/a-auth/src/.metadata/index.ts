/** beans: begin */
export * from '../bean/version.manager.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-auth.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-auth' {
  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/auth.js';
export * from '../entity/authProvider.js';

import { IDecoratorEntityOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IEntityRecord {
    'a-auth:auth': IDecoratorEntityOptions;
    'a-auth:authProvider': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-auth' {}
/** entity: end */
/** entity: begin */
import { EntityAuth } from '../entity/auth.js';
import { EntityAuthProvider } from '../entity/authProvider.js';
export interface IModuleEntity {
  auth: EntityAuth;
  authProvider: EntityAuthProvider;
}
/** entity: end */
/** entity: begin */
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
/** entity: end */
/** model: begin */
export * from '../model/auth.js';
export * from '../model/authProvider.js';

import { IDecoratorModelOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IModelRecord {
    'a-auth:auth': IDecoratorModelOptions;
    'a-auth:authProvider': IDecoratorModelOptions;
  }
}
declare module 'vona-module-a-auth' {
  export interface ModelAuth {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }

  export interface ModelAuthProvider {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }
}
/** model: end */
/** model: begin */
import { ModelAuth } from '../model/auth.js';
import { ModelAuthProvider } from '../model/authProvider.js';
export interface IModuleModel {
  auth: ModelAuth;
  authProvider: ModelAuthProvider;
}
/** model: end */
/** bean: begin */
export * from '../bean/bean.authProvider.js';
export * from '../bean/bean.authProviderBase.js';
export * from '../bean/bean.authProviderCache.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-auth' {
  export interface BeanAuthProvider {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }

  export interface BeanAuthProviderCache {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }
}
/** bean: end */
/** bean: begin */
import { BeanAuthProvider } from '../bean/bean.authProvider.js';
import { BeanAuthProviderCache } from '../bean/bean.authProviderCache.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    authProvider: BeanAuthProvider;
    authProviderCache: BeanAuthProviderCache;
  }
}
/** bean: end */
/** broadcast: begin */
export * from '../bean/broadcast.authProviderChanged.js';

import { IDecoratorBroadcastOptions } from 'vona-module-a-broadcast';
declare module 'vona-module-a-broadcast' {
  export interface IBroadcastRecord {
    'a-auth:authProviderChanged': IDecoratorBroadcastOptions;
  }
}
declare module 'vona-module-a-auth' {
  export interface BroadcastAuthProviderChanged {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }
}
/** broadcast: end */
/** broadcast: begin */
import { BroadcastAuthProviderChanged } from '../bean/broadcast.authProviderChanged.js';
export interface IModuleBroadcast {
  authProviderChanged: BroadcastAuthProviderChanged;
}
/** broadcast: end */
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
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }
}
/** meta: end */
/** meta redlock: begin */
import { MetaRedlock } from '../bean/meta.redlock.js';
/** meta redlock: end */
/** startup: begin */
export * from '../bean/startup.cacheAuthProviders.js';
export * from '../bean/startup.registerPassport.js';
export * from '../bean/startup.registerRouters.js';

import { IDecoratorStartupOptions } from 'vona-module-a-startup';
declare module 'vona-module-a-startup' {
  export interface IStartupRecord {
    'a-auth:cacheAuthProviders': IDecoratorStartupOptions;
    'a-auth:registerPassport': IDecoratorStartupOptions;
    'a-auth:registerRouters': IDecoratorStartupOptions;
  }
}
declare module 'vona-module-a-auth' {
  export interface StartupCacheAuthProviders {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }

  export interface StartupRegisterPassport {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }

  export interface StartupRegisterRouters {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }
}
/** startup: end */
/** service: begin */
export * from '../service/passport.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-auth:passport': never;
  }
}
declare module 'vona-module-a-auth' {
  export interface ServicePassport {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }
}
/** service: end */
/** service: begin */
import { ServicePassport } from '../service/passport.js';
export interface IModuleService {
  passport: ServicePassport;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-auth.service.passport': ServicePassport;
  }
}
/** service: end */
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
  TypeModuleBean,
  BeanScopeUtil,
  TypeModuleConfig,
  TypeModuleLocales,
  TypeLocaleBase,
} from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAAuth extends BeanScopeBase {}

export interface ScopeModuleAAuth {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  entity: IModuleEntity;
  model: IModuleModel;
  broadcast: IModuleBroadcast;
  redlock: MetaRedlock;
  service: IModuleService;
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
