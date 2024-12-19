/** entity: begin */
export * from '../entity/instance.js';

import { IDecoratorEntityOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IEntityRecord {
    'a-instance:instance': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-instance' {}
/** entity: end */
/** entity: begin */
import { EntityInstance } from '../entity/instance.js';
export interface IModuleEntity {
  instance: EntityInstance;
}
/** entity: end */
/** entity: begin */
declare module 'vona-module-a-instance' {
  export interface EntityInstance {
    column: <K extends keyof Omit<EntityInstance, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityInstance, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entity: end */
/** model: begin */
export * from '../model/instance.js';

import { IDecoratorModelOptions } from 'vona-module-a-database';
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
/** model: end */
/** model: begin */
import { ModelInstance } from '../model/instance.js';
export interface IModuleModel {
  instance: ModelInstance;
}
/** model: end */
/** bean: begin */
export * from '../bean/bean.instance.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-instance' {
  export interface BeanInstance {
    /** @internal */
    get scope(): ScopeModuleAInstance;
  }
}
/** bean: end */
/** bean: begin */
import { BeanInstance } from '../bean/bean.instance.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    instance: BeanInstance;
  }
}
/** bean: end */
/** broadcast: begin */
export * from '../bean/broadcast.reload.js';
export * from '../bean/broadcast.resetCache.js';

import { IDecoratorBroadcastOptions } from 'vona-module-a-broadcast';
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
/** broadcast: end */
/** broadcast: begin */
import { BroadcastReload } from '../bean/broadcast.reload.js';
import { BroadcastResetCache } from '../bean/broadcast.resetCache.js';
export interface IModuleBroadcast {
  reload: BroadcastReload;
  resetCache: BroadcastResetCache;
}
/** broadcast: end */
/** meta: begin */
export * from '../bean/meta.index.js';
export * from '../bean/meta.redlock.js';
export * from '../bean/meta.version.js';
import { IMetaOptionsIndex } from 'vona-module-a-index';
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
/** meta: end */
/** meta redlock: begin */
import { MetaRedlock } from '../bean/meta.redlock.js';
/** meta redlock: end */
/** service: begin */
export * from '../service/instance.js';

import 'vona';
declare module 'vona' {
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
/** service: end */
/** service: begin */
import { ServiceInstance } from '../service/instance.js';
export interface IModuleService {
  instance: ServiceInstance;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-instance.service.instance': ServiceInstance;
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
  entity: IModuleEntity;
  model: IModuleModel;
  broadcast: IModuleBroadcast;
  redlock: MetaRedlock;
  service: IModuleService;
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
