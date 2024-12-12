/** beans: begin */
export * from '../bean/bean.instance.js';
export * from '../bean/broadcast.reload.js';
export * from '../bean/broadcast.resetCache.js';
import { BeanInstance } from '../bean/bean.instance.js';
import { BroadcastReload } from '../bean/broadcast.reload.js';
import { BroadcastResetCache } from '../bean/broadcast.resetCache.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    instance: BeanInstance;
  }

  export interface IBeanRecordGeneral {
    'a-instance.broadcast.reload': BroadcastReload;
    'a-instance.broadcast.resetCache': BroadcastResetCache;
  }
}
declare module 'vona-module-a-instance' {
  export interface BeanInstance {
    get scope(): ScopeModuleAInstance;
  }

  export interface BroadcastReload {
    get scope(): ScopeModuleAInstance;
  }

  export interface BroadcastResetCache {
    get scope(): ScopeModuleAInstance;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/instance.js';

import { IDecoratorEntityOptions } from 'vona';
declare module 'vona' {
  export interface IEntityRecord {
    'a-instance:instance': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-instance' {}
/** entity: end */
/** model: begin */
export * from '../model/instance.js';

import { IDecoratorModelOptions } from 'vona';
declare module 'vona' {
  export interface IModelRecord {
    'a-instance:instance': IDecoratorModelOptions;
  }
}
declare module 'vona-module-a-instance' {
  export interface ModelInstance {
    get scope(): ScopeModuleAInstance;
  }
}
/** model: end */
/** meta: begin */
export * from '../bean/meta.index.js';
export * from '../bean/meta.redlock.js';
export * from '../bean/meta.version.js';
import { IMetaOptionsIndex } from 'vona';
import 'vona';
declare module 'vona' {
  export interface IMetaRecord {
    'a-instance:index': IMetaOptionsIndex;
    'a-instance:redlock': never;
    'a-instance:version': never;
  }
}
declare module 'vona-module-a-instance' {
  export interface MetaIndex {
    get scope(): ScopeModuleAInstance;
  }

  export interface MetaRedlock {
    get scope(): ScopeModuleAInstance;
  }

  export interface MetaVersion {
    get scope(): ScopeModuleAInstance;
  }
}
/** meta: end */
/** meta: begin */
import { MetaIndex } from '../bean/meta.index.js';
import { MetaRedlock } from '../bean/meta.redlock.js';
import { MetaVersion } from '../bean/meta.version.js';
export interface IModuleMeta {
  index: MetaIndex;
  redlock: MetaRedlock;
  version: MetaVersion;
}
/** meta: end */
/** meta redlock: begin */
import { MetaRedlock } from '../bean/meta.redlock.js';
/** meta redlock: end */
/** entities: begin */
import { EntityInstance } from '../entity/instance.js';
export interface IModuleEntity {
  instance: EntityInstance;
}
declare module 'vona-module-a-instance' {
  export interface EntityInstance {
    column: <K extends keyof Omit<EntityInstance, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityInstance, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entities: end */
/** models: begin */
import { ModelInstance } from '../model/instance.js';
export interface IModuleModel {
  instance: ModelInstance;
}
/** models: end */
/** services: begin */
export * from '../service/instance.js';
import { ServiceInstance } from '../service/instance.js';
export interface IModuleService {
  instance: ServiceInstance;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-instance.service.instance': ServiceInstance;
  }
}
declare module 'vona-module-a-instance' {
  export interface ServiceInstance {
    get scope(): ScopeModuleAInstance;
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
export class ScopeModuleAInstance extends BeanScopeBase {}

export interface ScopeModuleAInstance {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  redlock: MetaRedlock;
  service: IModuleService;
  model: IModuleModel;
  entity: IModuleEntity;
  atom: IModuleatom;
  middleware: IModulemiddleware;
  guard: IModuleguard;
  interceptor: IModuleinterceptor;
  pipe: IModulepipe;
  filter: IModulefilter;
  socketConnection: IModulesocketConnection;
  socketPacket: IModulesocketPacket;
  aop: IModuleaop;
  entity: IModuleentity;
  model: IModulemodel;
  controller: IModulecontroller;
  meta: IModulemeta;
  summerCache: IModulesummerCache;
  startup: IModulestartup;
  queue: IModulequeue;
  schedule: IModuleschedule;
}

import 'vona';
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

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-instance:${K}` {
  return `a-instance:${key}`;
}
/** scope: end */
