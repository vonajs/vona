import type { BeanScopeUtil, TypeLocaleBase, TypeModuleConfig, TypeModuleLocales } from 'vona';
import type { IDecoratorBroadcastOptions } from 'vona-module-a-broadcast';
import type { IDecoratorModelOptions } from 'vona-module-a-database';
import type { IMetaOptionsIndex } from 'vona-module-a-index';
import type { TypeEntityOptionsFields } from 'vona-module-a-openapi';
/** bean: end */
/** bean: begin */
import type { BeanInstance } from '../bean/bean.instance.ts';
/** broadcast: end */
/** broadcast: begin */
import type { BroadcastReload } from '../bean/broadcast.reload.ts';
import type { BroadcastResetCache } from '../bean/broadcast.resetCache.ts';

/** meta: end */
/** meta redlock: begin */
import type { MetaRedlock } from '../bean/meta.redlock.ts';
import type { IMiddlewareOptionsInstance } from '../bean/middleware.instance.ts';

import type { IMiddlewareSystemOptionsAppReady } from '../bean/middlewareSystem.appReady.ts';
import type { config } from '../config/config.ts';
import type { IEntityOptionsInstance } from '../entity/instance.ts';

/** entity: end */
/** entity: begin */
import type { EntityInstance } from '../entity/instance.ts';
/** model: end */
/** model: begin */
import type { ModelInstance } from '../model/instance.ts';
/** service: end */
/** service: begin */
import type { ServiceInstance } from '../service/instance.ts';
/** main: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** config: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.ts';
import locale_zh_cn from '../config/locale/zh-cn.ts';

import 'vona';
import 'vona';
/** service: end */
/** service: begin */

import 'vona';
import 'vona';
import 'vona';
import 'vona';
import 'vona';
import 'vona';

import 'vona';
/** model: end */
/** bean: begin */
export * from '../bean/bean.instance.ts';
declare module 'vona-module-a-aspect' {

  export interface IMiddlewareRecordGlobal {
    'a-instance:instance': IMiddlewareOptionsInstance;
  }

}
declare module 'vona-module-a-instance' {

  export interface MiddlewareInstance {
    /** @internal */
    get scope(): ScopeModuleAInstance;
  }
}
/** bean: end */
/** broadcast: begin */
export * from '../bean/broadcast.reload.ts';
declare module 'vona-module-a-aspect' {

  export interface IMiddlewareSystemRecord {
    'a-instance:appReady': IMiddlewareSystemOptionsAppReady;
  }

}
declare module 'vona-module-a-instance' {

  export interface MiddlewareSystemAppReady {
    /** @internal */
    get scope(): ScopeModuleAInstance;
  }
}
export * from '../bean/broadcast.resetCache.ts';
declare module 'vona-module-a-database' {

  export interface IEntityRecord {
    'a-instance:instance': IEntityOptionsInstance;
  }

}
declare module 'vona-module-a-instance' {

}
export interface IModuleEntity {
  instance: EntityInstance;
}
/** entity: end */
/** entity: begin */
declare module 'vona-module-a-instance' {

  export interface EntityInstance {
    $column: <K extends keyof Omit<EntityInstance, '$column' | '$columns' | '$table'>>(column: K) => K;
    $columns: <K extends keyof Omit<EntityInstance, '$column' | '$columns' | '$table'>>(...columns: K[]) => K[];
  }

  export interface IEntityOptionsInstance {
    fields?: TypeEntityOptionsFields<EntityInstance, IEntityOptionsInstance['fieldsMore']>;
  }
}
/** broadcast: end */
/** meta: begin */
export * from '../bean/meta.index.ts';
declare module 'vona-module-a-database' {

  export interface IModelRecord {
    'a-instance:instance': IDecoratorModelOptions;
  }

}
declare module 'vona-module-a-instance' {

  export interface ModelInstance {
    /** @internal */
    get scope(): ScopeModuleAInstance;
  }
}
export interface IModuleModel {
  instance: ModelInstance;
}
export * from '../bean/meta.redlock.ts';
declare module 'vona' {

}
declare module 'vona-module-a-instance' {

  export interface BeanInstance {
    /** @internal */
    get scope(): ScopeModuleAInstance;
  }
}
declare module 'vona' {
  export interface IBeanRecordGlobal {
    instance: BeanInstance;
  }
}
export * from '../bean/meta.version.ts';
/** middleware: begin */
export * from '../bean/middleware.instance.ts';
declare module 'vona-module-a-broadcast' {

  export interface IBroadcastRecord {
    'a-instance:reload': IDecoratorBroadcastOptions;
    'a-instance:resetCache': IDecoratorBroadcastOptions;
  }

}
declare module 'vona-module-a-instance' {

  export interface BroadcastReload {
    /** @internal */
    get scope(): ScopeModuleAInstance;
  }

  export interface BroadcastResetCache {
    /** @internal */
    get scope(): ScopeModuleAInstance;
  }
}
export interface IModuleBroadcast {
  reload: BroadcastReload;
  resetCache: BroadcastResetCache;
}
/** middleware: end */
/** middlewareSystem: begin */
export * from '../bean/middlewareSystem.appReady.ts';
/** service: end */
/** config: begin */
export * from '../config/config.ts';
/** middlewareSystem: end */
/** entity: begin */
export * from '../entity/instance.ts';
declare module 'vona' {

  export interface IMetaRecord {
    'a-instance:index': IMetaOptionsIndex;
    'a-instance:redlock': never;
    'a-instance:version': never;
  }

}
declare module 'vona-module-a-instance' {

  export interface MetaIndex {
    /** @internal */
    get scope(): ScopeModuleAInstance;
  }

  export interface MetaRedlock {
    /** @internal */
    get scope(): ScopeModuleAInstance;
  }

  export interface MetaVersion {
    /** @internal */
    get scope(): ScopeModuleAInstance;
  }
}
/** locale: end */
/** main: begin */
export * from '../main.ts';
declare module 'vona-module-a-web' {

  export interface IServiceRecord {
    'a-instance:instance': never;
  }

}
declare module 'vona-module-a-instance' {

  export interface ServiceInstance {
    /** @internal */
    get scope(): ScopeModuleAInstance;
  }
}
export interface IModuleService {
  instance: ServiceInstance;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-instance.service.instance': ServiceInstance;
  }
}
/** entity: end */
/** model: begin */
export * from '../model/instance.ts';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** meta redlock: end */
/** service: begin */
export * from '../service/instance.ts';

@Scope()
export class ScopeModuleAInstance extends BeanScopeBase {}

export interface ScopeModuleAInstance {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  entity: IModuleEntity;
  model: IModuleModel;
  broadcast: IModuleBroadcast;
  redlock: MetaRedlock;
  service: IModuleService;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-instance': ScopeModuleAInstance;
  }

  export interface IBeanScopeContainer {
    instance: ScopeModuleAInstance;
  }

  export interface IBeanScopeConfig {
    'a-instance': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-instance': (typeof locales)[TypeLocaleBase];
  }
}

export function $locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-instance::${K}` {
  return `a-instance::${key}`;
}
/** scope: end */
