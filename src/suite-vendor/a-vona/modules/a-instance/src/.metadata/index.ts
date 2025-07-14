/* eslint-disable */
import type { TypeSymbolKeyFieldsMore } from 'vona-module-a-database';
import type { TypeEntityMeta } from 'vona-module-a-database';
import type { TypeEntityOptionsFields } from 'vona-module-a-openapi';
/** middleware: begin */
export * from '../bean/middleware.instance.ts';
import type { IMiddlewareOptionsInstance } from '../bean/middleware.instance.ts';
import 'vona';
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
/** middleware: end */
/** middlewareSystem: begin */
export * from '../bean/middlewareSystem.appReady.ts';
import type { IMiddlewareSystemOptionsAppReady } from '../bean/middlewareSystem.appReady.ts';
import 'vona';
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
/** middlewareSystem: end */
/** entity: begin */
export * from '../entity/instance.ts';
import type { IEntityOptionsInstance } from '../entity/instance.ts';
import 'vona';
declare module 'vona-module-a-database' {
  
    export interface IEntityRecord {
      'a-instance:instance': IEntityOptionsInstance;
    }

  
}
declare module 'vona-module-a-instance' {
   
}
/** entity: end */
/** entity: begin */
import type { EntityInstance } from '../entity/instance.ts';
export interface IModuleEntity {
  'instance': EntityInstanceMeta;
}
/** entity: end */
/** entity: begin */
export type EntityInstanceTableName = 'aInstance';
export type EntityInstanceMeta=TypeEntityMeta<EntityInstance,EntityInstanceTableName>;
declare module 'vona-module-a-database' {
  export interface ITableRecord {
    'aInstance': never;
  }
}
declare module 'vona-module-a-instance' {
  
    export interface IEntityOptionsInstance {
      fields?: TypeEntityOptionsFields<EntityInstance, IEntityOptionsInstance[TypeSymbolKeyFieldsMore]>;
    }
}
/** entity: end */
/** model: begin */
export * from '../model/instance.ts';
import type { IModelOptionsInstance } from '../model/instance.ts';
import 'vona';
declare module 'vona-module-a-database' {
  
    export interface IModelRecord {
      'a-instance:instance': IModelOptionsInstance;
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
import type { ModelInstance } from '../model/instance.ts';
export interface IModuleModel {
  'instance': ModelInstance;
}
/** model: end */
/** model: begin */
import type { IModelCountParams, IModelGetOptions, IModelMethodOptions, IModelMethodOptionsGeneral, IModelClassRecord, IModelSelectParams, TableIdentity, TypeModelRelationResult, TypeModelWhere } from 'vona-module-a-database';
import { SymbolKeyEntity, SymbolKeyEntityMeta, SymbolKeyModelOptions } from 'vona-module-a-database';
declare module 'vona-module-a-instance' {
  export interface ModelInstance {
      [SymbolKeyEntity]: EntityInstance;
      [SymbolKeyEntityMeta]: EntityInstanceMeta;
      [SymbolKeyModelOptions]: IModelOptionsInstance;
      get $beanFullName(): 'a-instance.model.instance';
      get $onionName(): 'a-instance:instance';
      get<T extends IModelGetOptions<EntityInstance,ModelInstance>>(where: TypeModelWhere<EntityInstance>, options?: T): Promise<TypeModelRelationResult<EntityInstance, ModelInstance, T> | undefined>;
      mget<T extends IModelGetOptions<EntityInstance,ModelInstance>>(ids: TableIdentity[], options?: T): Promise<TypeModelRelationResult<EntityInstance, ModelInstance, T>[]>;
      select<T extends IModelSelectParams<EntityInstance,ModelInstance,ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelRelationResult<EntityInstance, ModelInstance, T>[]>;
      count<T extends IModelCountParams<EntityInstance,ModelInstance,ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined>(params?: T, options?: IModelMethodOptionsGeneral, modelJoins?: ModelJoins): Promise<BigNumber>;
    }
  export interface IModelOptionsInstance {
      cache?: {
        keyAux?: keyof EntityInstance;
      };
    }
}
declare module 'vona-module-a-database' {
  export interface IModelClassRecord {
    'a-instance:instance': ModelInstance;
  }
}
/** model: end */
/** bean: begin */
export * from '../bean/bean.instance.ts';

import 'vona';
declare module 'vona' {
  
  
}
declare module 'vona-module-a-instance' {
  
        export interface BeanInstance {
          /** @internal */
          get scope(): ScopeModuleAInstance;
        } 
}
/** bean: end */
/** bean: begin */
import type { BeanInstance } from '../bean/bean.instance.ts';
import 'vona';  
declare module 'vona' {
  export interface IBeanRecordGlobal {
    'instance': BeanInstance;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/instance.ts';

import 'vona';
declare module 'vona-module-a-bean' {
  
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
import type { ServiceInstance } from '../service/instance.ts';
export interface IModuleService {
  'instance': ServiceInstance;
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
/** broadcast: begin */
export * from '../bean/broadcast.reload.ts';
export * from '../bean/broadcast.resetCache.ts';

import { type IDecoratorBroadcastOptions } from 'vona-module-a-broadcast';
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
import type { BroadcastReload } from '../bean/broadcast.reload.ts';
import type { BroadcastResetCache } from '../bean/broadcast.resetCache.ts';
export interface IModuleBroadcast {
  'reload': BroadcastReload;
'resetCache': BroadcastResetCache;
}
/** broadcast: end */
/** meta: begin */
export * from '../bean/meta.index.ts';
export * from '../bean/meta.redlock.ts';
export * from '../bean/meta.version.ts';
import type { IMetaOptionsIndex } from 'vona-module-a-index';
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
import type { MetaRedlock } from '../bean/meta.redlock.ts';
/** meta redlock: end */
/** config: begin */
export * from '../config/config.ts';
import type { config } from '../config/config.ts';
/** config: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.ts';
import locale_zh_cn from '../config/locale/zh-cn.ts';
export const locales = {
  'en-us': locale_en_us,
'zh-cn': locale_zh_cn,
};
/** locale: end */
/** main: begin */
export * from '../main.ts';
/** main: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, type TypeModuleConfig, type TypeModuleLocales, type TypeLocaleBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAInstance extends BeanScopeBase {}

export interface ScopeModuleAInstance {
  util: BeanScopeUtil;
config: TypeModuleConfig<typeof config>;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
entity: IModuleEntity;
model: IModuleModel;
service: IModuleService;
broadcast: IModuleBroadcast;
redlock: MetaRedlock;
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

export function $locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-instance::${K}` {
  return `a-instance::${key}`;
}
/** scope: end */
