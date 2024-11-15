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
/** controllers: begin */
export * from '../controller/auth.js';
/** controllers: end */
/** entities: begin */
export * from '../entity/authSimple.js';
/** entities: end */
/** models: begin */
export * from '../model/authSimple.js';
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
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAAuthsimple extends BeanScopeBase {}

export interface ScopeModuleAAuthsimple
  extends TypeModuleResource<
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    never,
    IModuleService,
    IModuleModel
  > {}

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
/** scope: end */
