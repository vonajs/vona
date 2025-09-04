/* eslint-disable */
import type { TypeEntityMeta,TypeModelsClassLikeGeneral,TypeSymbolKeyFieldsMore } from 'vona-module-a-orm';
import type { TypeEntityOptionsFields } from 'vona-module-a-openapi';
import type { TableIdentity } from 'table-identity';
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

          export interface MiddlewareInstance {
            get $beanFullName(): 'a-instance.middleware.instance';
            get $onionName(): 'a-instance:instance';
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

          export interface MiddlewareSystemAppReady {
            get $beanFullName(): 'a-instance.middlewareSystem.appReady';
            get $onionName(): 'a-instance:appReady';
          } 
}
/** middlewareSystem: end */
/** entity: begin */
export * from '../entity/instance.ts';
import type { IEntityOptionsInstance } from '../entity/instance.ts';
import 'vona';
declare module 'vona-module-a-orm' {
  
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
declare module 'vona-module-a-orm' {
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
declare module 'vona-module-a-orm' {
  
    export interface IModelRecord {
      'a-instance:instance': IModelOptionsInstance;
    }

  
}
declare module 'vona-module-a-instance' {
  
        export interface ModelInstance {
          /** @internal */
          get scope(): ScopeModuleAInstance;
        }

          export interface ModelInstance {
            get $beanFullName(): 'a-instance.model.instance';
            get $onionName(): 'a-instance:instance';
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

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-instance.model.instance': ModelInstance;
  }
}
/** model: end */
/** model: begin */
import type { IModelGetOptions, IModelMethodOptions, IModelSelectParams, TypeModelSelectAndCount, TypeModelRelationResult, TypeModelWhere, IModelInsertOptions, TypeModelMutateRelationData, IModelDeleteOptions, IModelUpdateOptions, IModelMutateOptions, IModelSelectCountParams, IModelSelectAggrParams, TypeModelAggrRelationResult, IModelSelectGroupParams, TypeModelGroupRelationResult } from 'vona-module-a-orm';
import { SymbolKeyEntity, SymbolKeyEntityMeta, SymbolKeyModelOptions } from 'vona-module-a-orm';
declare module 'vona-module-a-instance' {
  
  export interface ModelInstance {
      [SymbolKeyEntity]: EntityInstance;
      [SymbolKeyEntityMeta]: EntityInstanceMeta;
      [SymbolKeyModelOptions]: IModelOptionsInstance;
      get<T extends IModelGetOptions<EntityInstance,ModelInstance>>(where: TypeModelWhere<EntityInstance>, options?: T): Promise<TypeModelRelationResult<EntityInstance, ModelInstance, T> | undefined>;
      mget<T extends IModelGetOptions<EntityInstance,ModelInstance>>(ids: TableIdentity[], options?: T): Promise<TypeModelRelationResult<EntityInstance, ModelInstance, T>[]>;
      selectAndCount<T extends IModelSelectParams<EntityInstance,ModelInstance,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelSelectAndCount<EntityInstance, ModelInstance, T>>;
      select<T extends IModelSelectParams<EntityInstance,ModelInstance,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelRelationResult<EntityInstance, ModelInstance, T>[]>;
      insert<T extends IModelInsertOptions<EntityInstance,ModelInstance>>(data?: TypeModelMutateRelationData<EntityInstance,ModelInstance, T>, options?: T): Promise<TypeModelMutateRelationData<EntityInstance,ModelInstance, T, true>>;
      insertBulk<T extends IModelInsertOptions<EntityInstance,ModelInstance>>(items: TypeModelMutateRelationData<EntityInstance,ModelInstance, T>[], options?: T): Promise<TypeModelMutateRelationData<EntityInstance,ModelInstance, T, true>[]>;
      update<T extends IModelUpdateOptions<EntityInstance,ModelInstance>>(data: TypeModelMutateRelationData<EntityInstance,ModelInstance, T>, options?: T): Promise<TypeModelMutateRelationData<EntityInstance,ModelInstance, T>>;
      updateBulk<T extends IModelUpdateOptions<EntityInstance,ModelInstance>>(items: TypeModelMutateRelationData<EntityInstance,ModelInstance, T>[], options?: T): Promise<TypeModelMutateRelationData<EntityInstance,ModelInstance, T>[]>;
      delete<T extends IModelDeleteOptions<EntityInstance,ModelInstance>>(where?: TypeModelWhere<EntityInstance>, options?: T): Promise<void>;
      deleteBulk<T extends IModelDeleteOptions<EntityInstance,ModelInstance>>(ids: TableIdentity[], options?: T): Promise<void>;
      mutate<T extends IModelMutateOptions<EntityInstance,ModelInstance>>(data?: TypeModelMutateRelationData<EntityInstance,ModelInstance, T>, options?: T): Promise<TypeModelMutateRelationData<EntityInstance,ModelInstance, T>>;
      mutateBulk<T extends IModelMutateOptions<EntityInstance,ModelInstance>>(items: TypeModelMutateRelationData<EntityInstance,ModelInstance, T>[], options?: T): Promise<TypeModelMutateRelationData<EntityInstance,ModelInstance, T>[]>;
      count<T extends IModelSelectCountParams<EntityInstance,ModelInstance,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<BigNumber | undefined>;
      aggregate<T extends IModelSelectAggrParams<EntityInstance,ModelInstance,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelAggrRelationResult<T>>;
      group<T extends IModelSelectGroupParams<EntityInstance,ModelInstance,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelGroupRelationResult<EntityInstance, T>[]>;
    }
}
declare module 'vona-module-a-orm' {
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

          export interface ServiceInstance {
            get $beanFullName(): 'a-instance.service.instance';
            get $onionName(): 'a-instance:instance';
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

          export interface BroadcastReload {
            get $beanFullName(): 'a-instance.broadcast.reload';
            get $onionName(): 'a-instance:reload';
          }

        export interface BroadcastResetCache {
          /** @internal */
          get scope(): ScopeModuleAInstance;
        }

          export interface BroadcastResetCache {
            get $beanFullName(): 'a-instance.broadcast.resetCache';
            get $onionName(): 'a-instance:resetCache';
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

          export interface MetaIndex {
            get $beanFullName(): 'a-instance.meta.index';
            get $onionName(): 'a-instance:index';
          }

        export interface MetaRedlock {
          /** @internal */
          get scope(): ScopeModuleAInstance;
        }

          export interface MetaRedlock {
            get $beanFullName(): 'a-instance.meta.redlock';
            get $onionName(): 'a-instance:redlock';
          }

        export interface MetaVersion {
          /** @internal */
          get scope(): ScopeModuleAInstance;
        }

          export interface MetaVersion {
            get $beanFullName(): 'a-instance.meta.version';
            get $onionName(): 'a-instance:version';
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
