/** beans: begin */
export * from '../bean/auth.provider.simple.js';
export * from '../bean/bean.authSimple.js';
export * from '../bean/event.accountMigration.js';
export * from '../bean/version.manager.js';
import { AuthProviderSimple } from '../bean/auth.provider.simple.js';
import { BeanAuthSimple } from '../bean/bean.authSimple.js';
import { EventAccountMigration } from '../bean/event.accountMigration.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    authSimple: BeanAuthSimple;
  }

  export interface IBeanRecordGeneral {
    'a-authsimple.auth.provider.simple': AuthProviderSimple;
    'a-authsimple.event.accountMigration': EventAccountMigration;
    'a-authsimple.version.manager': VersionManager;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/authSimple.js';

import { IDecoratorEntityOptions } from 'vona';
declare module 'vona' {
  export interface IEntityRecord {
    'a-authsimple:authSimple': IDecoratorEntityOptions;
  }
}
/** entity: end */
/** model: begin */
export * from '../model/authSimple.js';

import { IDecoratorModelOptions } from 'vona';
declare module 'vona' {
  export interface IModelRecord {
    'a-authsimple:authSimple': IDecoratorModelOptions;
  }
}
/** model: end */
/** controller: begin */
export * from '../controller/auth.js';

import { IDecoratorControllerOptions } from 'vona';
declare module 'vona' {
  export interface IControllerRecord {
    'a-authsimple:auth': IDecoratorControllerOptions;
  }
}
/** controller: end */
/** entities: begin */
import { EntityAuthSimple } from '../entity/authSimple.js';
export interface IModuleEntity {
  authSimple: EntityAuthSimple;
}
declare module 'vona-module-a-authsimple' {
  export interface EntityAuthSimple {
    column<K extends keyof Omit<EntityAuthSimple, 'column' | 'columns' | 'table'>>(column: K): K;
    columns<K extends keyof Omit<EntityAuthSimple, 'column' | 'columns' | 'table'>>(...columns: K[]): K[];
  }
}
/** entities: end */
/** models: begin */
import { ModelAuthSimple } from '../model/authSimple.js';
export interface IModuleModel {
  authSimple: ModelAuthSimple;
}
/** models: end */
/** services: begin */
export * from '../service/auth.js';
export * from '../service/simple.js';
import { ServiceAuth } from '../service/auth.js';
import { ServiceSimple } from '../service/simple.js';
export interface IModuleService {
  auth: ServiceAuth;
  simple: ServiceSimple;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-authsimple.service.auth': ServiceAuth;
    'a-authsimple.service.simple': ServiceSimple;
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
import {
  BeanScopeBase,
  Scope,
  TypeModuleBean,
  BeanScopeUtil,
  TypeModuleConfig,
  TypeModuleErrors,
  TypeModuleLocales,
  TypeLocaleBase,
} from 'vona';

@Scope()
export class ScopeModuleAAuthsimple extends BeanScopeBase {}

export interface ScopeModuleAAuthsimple {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  error: TypeModuleErrors<typeof Errors>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  service: IModuleService;
  model: IModuleModel;
  entity: IModuleEntity;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-authsimple': ScopeModuleAAuthsimple;
  }

  export interface IBeanScopeContainer {
    authsimple: ScopeModuleAAuthsimple;
  }

  export interface IBeanScopeConfig {
    'a-authsimple': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-authsimple': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-authsimple:${K}` {
  return `a-authsimple:${key}`;
}
/** scope: end */
