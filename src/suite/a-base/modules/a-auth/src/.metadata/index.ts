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
/** model: end */
/** meta: begin */
export * from '../bean/meta.redlock.js';

import 'vona';
declare module 'vona' {
  export interface IMetaRecord {
    'a-auth:redlock': never;
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
/** startup: end */
/** entities: begin */
import { EntityAuth } from '../entity/auth.js';
import { EntityAuthProvider } from '../entity/authProvider.js';
export interface IModuleEntity {
  auth: EntityAuth;
  authProvider: EntityAuthProvider;
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
  service: IModuleService;
  model: IModuleModel;
  entity: IModuleEntity;
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
