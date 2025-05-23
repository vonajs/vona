import type { BeanScopeUtil, TypeLocaleBase, TypeModuleConfig, TypeModuleErrors, TypeModuleLocales } from 'vona';
/** model: end */
/** bean: begin */
import type { IDecoratorEntityOptions } from 'vona-module-a-database';
import type { IDecoratorModelOptions } from 'vona-module-a-database';

import type { EventOn } from 'vona-module-a-event';
import type { IDecoratorControllerOptions } from 'vona-module-a-web';
/** bean: end */
/** bean: begin */
import type { BeanAuth } from '../bean/bean.auth.ts';

import type { BeanAuthProvider } from '../bean/bean.authProvider.ts';
/** event: end */
/** event: begin */
import type { EventAccountMigration } from '../bean/event.accountMigration.ts';
/** event: end */
/** event: begin */
import type { TypeEventAccountMigrationData, TypeEventAccountMigrationResult } from '../bean/event.accountMigration.ts';
import type { EventIssuePassport } from '../bean/event.issuePassport.ts';

import type { TypeEventIssuePassportData, TypeEventIssuePassportResult } from '../bean/event.issuePassport.ts';
/** meta: end */
/** meta redlock: begin */
import type { MetaRedlock } from '../bean/meta.redlock.ts';
import type { config } from '../config/config.ts';
import type { Errors } from '../config/errors.ts';
/** entity: end */
/** entity: begin */
import type { EntityAuth } from '../entity/auth.ts';
import type { EntityAuthProvider } from '../entity/authProvider.ts';

/** model: end */
/** model: begin */
import type { ModelAuth } from '../model/auth.ts';
import type { ModelAuthProvider } from '../model/authProvider.ts';

/** service: end */
/** service: begin */
import type { ServiceAuth } from '../service/auth.ts';
import type { ServiceAuthInnerAdapter } from '../service/authInnerAdapter.ts';
/** error: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
/** service: end */
/** service: begin */

import { Scope } from 'vona-module-a-bean';

/** config: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.ts';
import locale_zh_cn from '../config/locale/zh-cn.ts';
import 'vona';
import 'vona';
import 'vona';
import 'vona';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/bean.auth.ts';
export * from '../bean/bean.authProvider.ts';
declare module 'vona-module-a-database' {

  export interface IEntityRecord {
    'a-auth:auth': IDecoratorEntityOptions;
    'a-auth:authProvider': IDecoratorEntityOptions;
  }

}
declare module 'vona-module-a-auth' {

}
export interface IModuleEntity {
  auth: EntityAuth;
  authProvider: EntityAuthProvider;
}
/** entity: end */
/** entity: begin */
declare module 'vona-module-a-auth' {

  export interface EntityAuth {
    $column: <K extends keyof Omit<EntityAuth, '$column' | '$columns' | '$table'>>(column: K) => K;
    $columns: <K extends keyof Omit<EntityAuth, '$column' | '$columns' | '$table'>>(...columns: K[]) => K[];
  }

  export interface EntityAuthProvider {
    $column: <K extends keyof Omit<EntityAuthProvider, '$column' | '$columns' | '$table'>>(column: K) => K;
    $columns: <K extends keyof Omit<EntityAuthProvider, '$column' | '$columns' | '$table'>>(...columns: K[]) => K[];
  }
}
/** bean: end */
/** event: begin */
export * from '../bean/event.accountMigration.ts';
export * from '../bean/event.issuePassport.ts';
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
export interface IModuleModel {
  auth: ModelAuth;
  authProvider: ModelAuthProvider;
}
/** event: end */
/** meta: begin */
export * from '../bean/meta.printTip.ts';
export * from '../bean/meta.redlock.ts';
declare module 'vona' {

}
declare module 'vona-module-a-auth' {

  export interface BeanAuth {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }

  export interface BeanAuthProvider {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }
}
declare module 'vona' {
  export interface IBeanRecordGlobal {
    auth: BeanAuth;
    authProvider: BeanAuthProvider;
  }
}
export * from '../bean/meta.version.ts';
/** controller: end */
/** config: begin */
export * from '../config/config.ts';
declare module 'vona' {

}
declare module 'vona-module-a-auth' {

  export interface EventAccountMigration {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }

  export interface EventIssuePassport {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }
}
export interface IModuleEvent {
  accountMigration: EventAccountMigration;
  issuePassport: EventIssuePassport;
}
declare module 'vona-module-a-event' {
  export interface IEventRecord {
    'a-auth:accountMigration': EventOn<TypeEventAccountMigrationData, TypeEventAccountMigrationResult>;
    'a-auth:issuePassport': EventOn<TypeEventIssuePassportData, TypeEventIssuePassportResult>;
  }
}
/** locale: end */
/** error: begin */
export * from '../config/errors.ts';
/** service: end */
/** controller: begin */
export * from '../controller/passport.ts';
/** entity: begin */
export * from '../entity/auth.ts';
declare module 'vona' {

  export interface IMetaRecord {
    'a-auth:printTip': never;
    'a-auth:redlock': never;
    'a-auth:version': never;
  }

}
declare module 'vona-module-a-auth' {

  export interface MetaPrintTip {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }

  export interface MetaRedlock {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }

  export interface MetaVersion {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }
}
export * from '../entity/authProvider.ts';
/** entity: end */
/** model: begin */
export * from '../model/auth.ts';
declare module 'vona-module-a-web' {

  export interface IServiceRecord {
    'a-auth:auth': never;
    'a-auth:authInnerAdapter': never;
  }

}
declare module 'vona-module-a-auth' {

  export interface ServiceAuth {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }

  export interface ServiceAuthInnerAdapter {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }
}
export interface IModuleService {
  auth: ServiceAuth;
  authInnerAdapter: ServiceAuthInnerAdapter;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-auth.service.auth': ServiceAuth;
    'a-auth.service.authInnerAdapter': ServiceAuthInnerAdapter;
  }
}
export * from '../model/authProvider.ts';
declare module 'vona-module-a-web' {

  export interface IControllerRecord {
    'a-auth:passport': IDecoratorControllerOptions;
  }

}
declare module 'vona-module-a-auth' {

  export interface ControllerPassport {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }
}
/** controller: end */
/** controller: begin */
declare module 'vona-module-a-web' {
  export interface IApiPathGetRecord {
    '/auth/passport/callback': undefined;
  }

}
/** meta redlock: end */
/** service: begin */
export * from '../service/auth.ts';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
export * from '../service/authInnerAdapter.ts';

@Scope()
export class ScopeModuleAAuth extends BeanScopeBase {}

export interface ScopeModuleAAuth {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  error: TypeModuleErrors<typeof Errors>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  entity: IModuleEntity;
  model: IModuleModel;
  event: IModuleEvent;
  redlock: MetaRedlock;
  service: IModuleService;
}

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

export function $locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-auth::${K}` {
  return `a-auth::${key}`;
}
/** scope: end */
