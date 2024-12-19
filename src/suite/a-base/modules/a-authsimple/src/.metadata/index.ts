/** beans: begin */
export * from '../bean/auth.provider.simple.js';
export * from '../bean/version.manager.js';
import { AuthProviderSimple } from '../bean/auth.provider.simple.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-authsimple.auth.provider.simple': AuthProviderSimple;
    'a-authsimple.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-authsimple' {
  export interface AuthProviderSimple {
    /** @internal */
    get scope(): ScopeModuleAAuthsimple;
  }

  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleAAuthsimple;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/authSimple.js';

import { IDecoratorEntityOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IEntityRecord {
    'a-authsimple:authSimple': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-authsimple' {}
/** entity: end */
/** entity: begin */
import { EntityAuthSimple } from '../entity/authSimple.js';
export interface IModuleEntity {
  authSimple: EntityAuthSimple;
}
/** entity: end */
/** entity: begin */
declare module 'vona-module-a-authsimple' {
  export interface EntityAuthSimple {
    column: <K extends keyof Omit<EntityAuthSimple, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityAuthSimple, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entity: end */
/** model: begin */
export * from '../model/authSimple.js';

import { IDecoratorModelOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IModelRecord {
    'a-authsimple:authSimple': IDecoratorModelOptions;
  }
}
declare module 'vona-module-a-authsimple' {
  export interface ModelAuthSimple {
    /** @internal */
    get scope(): ScopeModuleAAuthsimple;
  }
}
/** model: end */
/** model: begin */
import { ModelAuthSimple } from '../model/authSimple.js';
export interface IModuleModel {
  authSimple: ModelAuthSimple;
}
/** model: end */
/** bean: begin */
export * from '../bean/bean.authSimple.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-authsimple' {
  export interface BeanAuthSimple {
    /** @internal */
    get scope(): ScopeModuleAAuthsimple;
  }
}
/** bean: end */
/** bean: begin */
import { BeanAuthSimple } from '../bean/bean.authSimple.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    authSimple: BeanAuthSimple;
  }
}
/** bean: end */
/** eventListener: begin */
export * from '../bean/eventListener.accountMigration.js';

import { IDecoratorEventListenerOptions } from 'vona-module-a-event';
declare module 'vona-module-a-event' {
  export interface IEventListenerRecord {
    'a-authsimple:accountMigration': IDecoratorEventListenerOptions;
  }
}
declare module 'vona-module-a-authsimple' {
  export interface EventListenerAccountMigration {
    /** @internal */
    get scope(): ScopeModuleAAuthsimple;
  }
}
/** eventListener: end */
/** service: begin */
export * from '../service/auth.js';
export * from '../service/simple.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-authsimple:auth': never;
    'a-authsimple:simple': never;
  }
}
declare module 'vona-module-a-authsimple' {
  export interface ServiceAuth {
    /** @internal */
    get scope(): ScopeModuleAAuthsimple;
  }

  export interface ServiceSimple {
    /** @internal */
    get scope(): ScopeModuleAAuthsimple;
  }
}
/** service: end */
/** service: begin */
import { ServiceAuth } from '../service/auth.js';
import { ServiceSimple } from '../service/simple.js';
export interface IModuleService {
  auth: ServiceAuth;
  simple: ServiceSimple;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-authsimple.service.auth': ServiceAuth;
    'a-authsimple.service.simple': ServiceSimple;
  }
}
/** service: end */
/** controller: begin */
export * from '../controller/auth.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
  export interface IControllerRecord {
    'a-authsimple:auth': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-authsimple' {
  export interface ControllerAuth {
    /** @internal */
    get scope(): ScopeModuleAAuthsimple;
  }
}
/** controller: end */
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
  entity: IModuleEntity;
  model: IModuleModel;
  service: IModuleService;
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
