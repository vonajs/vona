/** beans: begin */
export * from '../bean/auth.provider.open.js';
export * from '../bean/bean.authOpen.js';
export * from '../bean/event.accountMigration.js';
export * from '../bean/version.manager.js';
import { AuthProviderOpen } from '../bean/auth.provider.open.js';
import { BeanAuthOpen } from '../bean/bean.authOpen.js';
import { EventAccountMigration } from '../bean/event.accountMigration.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    authOpen: BeanAuthOpen;
  }

  export interface IBeanRecordGeneral {
    'a-authopen.auth.provider.open': AuthProviderOpen;
    'a-authopen.event.accountMigration': EventAccountMigration;
    'a-authopen.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-authopen' {
  export interface AuthProviderOpen {
    get scope(): ScopeModuleAAuthopen;
  }

  export interface BeanAuthOpen {
    get scope(): ScopeModuleAAuthopen;
  }

  export interface EventAccountMigration {
    get scope(): ScopeModuleAAuthopen;
  }

  export interface VersionManager {
    get scope(): ScopeModuleAAuthopen;
  }
}
/** beans: end */
/** atom: begin */
export * from '../atom/authOpen.js';

import 'vona';
declare module 'vona' {
  export interface IAtomRecord {
    'a-authopen:authOpen': never;
  }
}
declare module 'vona-module-a-authopen' {
  export interface AtomAuthOpen {
    get scope(): ScopeModuleAAuthopen;
  }
}
/** atom: end */
/** entity: begin */
export * from '../entity/authOpen.js';

import { IDecoratorEntityOptions } from 'vona-module-a-database';
declare module 'vona' {
  export interface IEntityRecord {
    'a-authopen:authOpen': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-authopen' {}
/** entity: end */
/** entity: begin */
import { EntityAuthOpen } from '../entity/authOpen.js';
export interface IModuleEntity {
  authOpen: EntityAuthOpen;
}
/** entity: end */
/** entity: begin */
declare module 'vona-module-a-authopen' {
  export interface EntityAuthOpen {
    column: <K extends keyof Omit<EntityAuthOpen, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityAuthOpen, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entity: end */
/** model: begin */
export * from '../model/authOpen.js';

import { IDecoratorModelOptions } from 'vona-module-a-database';
declare module 'vona' {
  export interface IModelRecord {
    'a-authopen:authOpen': IDecoratorModelOptions;
  }
}
declare module 'vona-module-a-authopen' {
  export interface ModelAuthOpen {
    get scope(): ScopeModuleAAuthopen;
  }
}
/** model: end */
/** model: begin */
import { ModelAuthOpen } from '../model/authOpen.js';
export interface IModuleModel {
  authOpen: ModelAuthOpen;
}
/** model: end */
/** service: begin */
export * from '../service/auth.js';
export * from '../service/authOpen.js';
export * from '../service/token.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-authopen:auth': never;
    'a-authopen:authOpen': never;
    'a-authopen:token': never;
  }
}
declare module 'vona-module-a-authopen' {
  export interface ServiceAuth {
    get scope(): ScopeModuleAAuthopen;
  }

  export interface ServiceAuthOpen {
    get scope(): ScopeModuleAAuthopen;
  }

  export interface ServiceToken {
    get scope(): ScopeModuleAAuthopen;
  }
}
/** service: end */
/** service: begin */
import { ServiceAuth } from '../service/auth.js';
import { ServiceAuthOpen } from '../service/authOpen.js';
import { ServiceToken } from '../service/token.js';
export interface IModuleService {
  auth: ServiceAuth;
  authOpen: ServiceAuthOpen;
  token: ServiceToken;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-authopen.service.auth': ServiceAuth;
    'a-authopen.service.authOpen': ServiceAuthOpen;
    'a-authopen.service.token': ServiceToken;
  }
}
/** service: end */
/** controller: begin */
export * from '../controller/auth.js';
export * from '../controller/authOpen.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona' {
  export interface IControllerRecord {
    'a-authopen:auth': IDecoratorControllerOptions;
    'a-authopen:authOpen': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-authopen' {
  export interface ControllerAuth {
    get scope(): ScopeModuleAAuthopen;
  }

  export interface ControllerAuthOpen {
    get scope(): ScopeModuleAAuthopen;
  }
}
/** controller: end */
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
  TypeModuleErrors,
  TypeModuleLocales,
  TypeLocaleBase,
} from 'vona';

@Scope()
export class ScopeModuleAAuthopen extends BeanScopeBase {}

export interface ScopeModuleAAuthopen {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  error: TypeModuleErrors<typeof Errors>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  entity: IModuleEntity;
  model: IModuleModel;
  service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-authopen': ScopeModuleAAuthopen;
  }

  export interface IBeanScopeContainer {
    authopen: ScopeModuleAAuthopen;
  }

  export interface IBeanScopeLocale {
    'a-authopen': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-authopen:${K}` {
  return `a-authopen:${key}`;
}
/** scope: end */
