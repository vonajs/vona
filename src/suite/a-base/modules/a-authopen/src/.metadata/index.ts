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
/** beans: end */
/** entity: begin */
export * from '../entity/authOpen.js';

import { IDecoratorEntityOptions } from 'vona';
declare module 'vona' {
  export interface IEntityRecord {
    'a-authopen:authOpen': IDecoratorEntityOptions;
  }
}
/** entity: end */
/** model: begin */
export * from '../model/authOpen.js';

import { IDecoratorModelOptions } from 'vona';
declare module 'vona' {
  export interface IModelRecord {
    'a-authopen:authOpen': IDecoratorModelOptions;
  }
}
/** model: end */
/** controller: begin */
export * from '../controller/auth.js';
export * from '../controller/authOpen.js';

import { IDecoratorControllerOptions } from 'vona';
declare module 'vona' {
  export interface IControllerRecord {
    'a-authopen:auth': IDecoratorControllerOptions;
    'a-authopen:authOpen': IDecoratorControllerOptions;
  }
}
/** controller: end */
/** atoms: begin */
export * from '../atom/authOpen.js';
/** atoms: end */
/** entities: begin */
import { EntityAuthOpen } from '../entity/authOpen.js';
export interface IModuleEntity {
  authOpen: EntityAuthOpen;
}
/** entities: end */
/** models: begin */
import { ModelAuthOpen } from '../model/authOpen.js';
export interface IModuleModel {
  authOpen: ModelAuthOpen;
}
/** models: end */
/** services: begin */
export * from '../service/auth.js';
export * from '../service/authOpen.js';
export * from '../service/token.js';
import { ServiceAuth } from '../service/auth.js';
import { ServiceAuthOpen } from '../service/authOpen.js';
import { ServiceToken } from '../service/token.js';
export interface IModuleService {
  auth: ServiceAuth;
  authOpen: ServiceAuthOpen;
  token: ServiceToken;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-authopen.service.auth': ServiceAuth;
    'a-authopen.service.authOpen': ServiceAuthOpen;
    'a-authopen.service.token': ServiceToken;
  }
}
/** services: end */
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
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAAuthopen extends BeanScopeBase {}

export interface ScopeModuleAAuthopen
  extends TypeModuleResource<
    never,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    never,
    never,
    IModuleService,
    IModuleModel,
    IModuleEntity,
    never
  > {}

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
