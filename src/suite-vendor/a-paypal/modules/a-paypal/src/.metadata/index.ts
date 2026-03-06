/* eslint-disable */
import type { TypeEntityMeta,TypeModelsClassLikeGeneral,TypeSymbolKeyFieldsMore } from 'vona-module-a-orm';
import type { TypeEntityOptionsFields } from 'vona-module-a-openapi';
import type { TableIdentity } from 'table-identity';
/** entity: begin */
export * from '../entity/paypalRecord.tsx';
import type { IEntityOptionsPaypalRecord } from '../entity/paypalRecord.tsx';
import 'vona-module-a-orm';
declare module 'vona-module-a-orm' {
  
    export interface IEntityRecord {
      'a-paypal:paypalRecord': IEntityOptionsPaypalRecord;
    }

  
}
declare module 'vona-module-a-paypal' {
   
}
/** entity: end */
/** entity: begin */
import type { EntityPaypalRecord } from '../entity/paypalRecord.tsx';
export interface IModuleEntity {
  'paypalRecord': EntityPaypalRecordMeta;
}
/** entity: end */
/** entity: begin */
export type EntityPaypalRecordTableName = 'paypalRecord';
export type EntityPaypalRecordMeta=TypeEntityMeta<EntityPaypalRecord,EntityPaypalRecordTableName>;
declare module 'vona-module-a-orm' {
  export interface ITableRecord {
    'paypalRecord': EntityPaypalRecordMeta;
  }
}
declare module 'vona-module-a-paypal' {
  
    export interface IEntityOptionsPaypalRecord {
      fields?: TypeEntityOptionsFields<EntityPaypalRecord, IEntityOptionsPaypalRecord[TypeSymbolKeyFieldsMore]>;
    }
}
/** entity: end */
/** model: begin */
export * from '../model/paypalRecord.ts';
import type { IModelOptionsPaypalRecord } from '../model/paypalRecord.ts';
import 'vona-module-a-orm';
declare module 'vona-module-a-orm' {
  
    export interface IModelRecord {
      'a-paypal:paypalRecord': IModelOptionsPaypalRecord;
    }

  
}
declare module 'vona-module-a-paypal' {
  
        export interface ModelPaypalRecord {
          /** @internal */
          get scope(): ScopeModuleAPaypal;
        }

          export interface ModelPaypalRecord {
            get $beanFullName(): 'a-paypal.model.paypalRecord';
            get $onionName(): 'a-paypal:paypalRecord';
            get $onionOptions(): IModelOptionsPaypalRecord;
          } 
}
/** model: end */
/** model: begin */
import type { ModelPaypalRecord } from '../model/paypalRecord.ts';
export interface IModuleModel {
  'paypalRecord': ModelPaypalRecord;
}
/** model: end */
/** model: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-paypal.model.paypalRecord': ModelPaypalRecord;
  }
}
/** model: end */
/** model: begin */
import type { IModelGetOptions, IModelMethodOptions, IModelSelectParams, TypeModelSelectAndCount, TypeModelRelationResult, TypeModelWhere, IModelInsertOptions, TypeModelMutateRelationData, IModelDeleteOptions, IModelUpdateOptions, IModelMutateOptions, IModelSelectCountParams, IModelSelectAggrParams, TypeModelAggrRelationResult, IModelSelectGroupParams, TypeModelGroupRelationResult } from 'vona-module-a-orm';
import { SymbolKeyEntity, SymbolKeyEntityMeta, SymbolKeyModelOptions } from 'vona-module-a-orm';
declare module 'vona-module-a-paypal' {
  
  export interface ModelPaypalRecord {
      [SymbolKeyEntity]: EntityPaypalRecord;
      [SymbolKeyEntityMeta]: EntityPaypalRecordMeta;
      [SymbolKeyModelOptions]: IModelOptionsPaypalRecord;
      get<T extends IModelGetOptions<EntityPaypalRecord,ModelPaypalRecord>>(where: TypeModelWhere<EntityPaypalRecord>, options?: T): Promise<TypeModelRelationResult<EntityPaypalRecord, ModelPaypalRecord, T> | undefined>;
      mget<T extends IModelGetOptions<EntityPaypalRecord,ModelPaypalRecord>>(ids: TableIdentity[], options?: T): Promise<TypeModelRelationResult<EntityPaypalRecord, ModelPaypalRecord, T>[]>;
      selectAndCount<T extends IModelSelectParams<EntityPaypalRecord,ModelPaypalRecord,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelSelectAndCount<EntityPaypalRecord, ModelPaypalRecord, T>>;
      select<T extends IModelSelectParams<EntityPaypalRecord,ModelPaypalRecord,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelRelationResult<EntityPaypalRecord, ModelPaypalRecord, T>[]>;
      insert<T extends IModelInsertOptions<EntityPaypalRecord,ModelPaypalRecord>>(data?: TypeModelMutateRelationData<EntityPaypalRecord,ModelPaypalRecord, T>, options?: T): Promise<TypeModelMutateRelationData<EntityPaypalRecord,ModelPaypalRecord, T, true>>;
      insertBulk<T extends IModelInsertOptions<EntityPaypalRecord,ModelPaypalRecord>>(items: TypeModelMutateRelationData<EntityPaypalRecord,ModelPaypalRecord, T>[], options?: T): Promise<TypeModelMutateRelationData<EntityPaypalRecord,ModelPaypalRecord, T, true>[]>;
      update<T extends IModelUpdateOptions<EntityPaypalRecord,ModelPaypalRecord>>(data: TypeModelMutateRelationData<EntityPaypalRecord,ModelPaypalRecord, T>, options?: T): Promise<TypeModelMutateRelationData<EntityPaypalRecord,ModelPaypalRecord, T>>;
      updateBulk<T extends IModelUpdateOptions<EntityPaypalRecord,ModelPaypalRecord>>(items: TypeModelMutateRelationData<EntityPaypalRecord,ModelPaypalRecord, T>[], options?: T): Promise<TypeModelMutateRelationData<EntityPaypalRecord,ModelPaypalRecord, T>[]>;
      delete<T extends IModelDeleteOptions<EntityPaypalRecord,ModelPaypalRecord>>(where?: TypeModelWhere<EntityPaypalRecord>, options?: T): Promise<void>;
      deleteBulk<T extends IModelDeleteOptions<EntityPaypalRecord,ModelPaypalRecord>>(ids: TableIdentity[], options?: T): Promise<void>;
      mutate<T extends IModelMutateOptions<EntityPaypalRecord,ModelPaypalRecord>>(data?: TypeModelMutateRelationData<EntityPaypalRecord,ModelPaypalRecord, T>, options?: T): Promise<TypeModelMutateRelationData<EntityPaypalRecord,ModelPaypalRecord, T>>;
      mutateBulk<T extends IModelMutateOptions<EntityPaypalRecord,ModelPaypalRecord>>(items: TypeModelMutateRelationData<EntityPaypalRecord,ModelPaypalRecord, T>[], options?: T): Promise<TypeModelMutateRelationData<EntityPaypalRecord,ModelPaypalRecord, T>[]>;
      count<T extends IModelSelectCountParams<EntityPaypalRecord,ModelPaypalRecord,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<string | undefined>;
      aggregate<T extends IModelSelectAggrParams<EntityPaypalRecord,ModelPaypalRecord,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelAggrRelationResult<T>>;
      group<T extends IModelSelectGroupParams<EntityPaypalRecord,ModelPaypalRecord,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelGroupRelationResult<EntityPaypalRecord, T>[]>;
      getById<T extends IModelGetOptions<EntityPaypalRecord,ModelPaypalRecord>>(id: TableIdentity, options?: T): Promise<TypeModelRelationResult<EntityPaypalRecord, ModelPaypalRecord, T> | undefined>;
updateById<T extends IModelUpdateOptions<EntityPaypalRecord,ModelPaypalRecord>>(id: TableIdentity, data: TypeModelMutateRelationData<EntityPaypalRecord,ModelPaypalRecord, T>, options?: T): Promise<TypeModelMutateRelationData<EntityPaypalRecord,ModelPaypalRecord, T>>;
deleteById<T extends IModelDeleteOptions<EntityPaypalRecord,ModelPaypalRecord>>(id: TableIdentity, options?: T): Promise<void>;
    }
}
declare module 'vona-module-a-orm' {
  export interface IModelClassRecord {
    'a-paypal:paypalRecord': ModelPaypalRecord;
  }
}
/** model: end */
/** bean: begin */
export * from '../bean/bean.paypal.ts';

import 'vona';
declare module 'vona' {
  
  
}
declare module 'vona-module-a-paypal' {
  
        export interface BeanPaypal {
          /** @internal */
          get scope(): ScopeModuleAPaypal;
        } 
}
/** bean: end */
/** bean: begin */
import type { BeanPaypal } from '../bean/bean.paypal.ts';
import 'vona';  
declare module 'vona' {
  export interface IBeanRecordGlobal {
    'paypal': BeanPaypal;
  }
}
/** bean: end */
/** meta: begin */
export * from '../bean/meta.version.ts';

import 'vona-module-a-meta';
declare module 'vona-module-a-meta' {
  
    export interface IMetaRecord {
      'a-paypal:version': never;
    }

  
}
declare module 'vona-module-a-paypal' {
  
        export interface MetaVersion {
          /** @internal */
          get scope(): ScopeModuleAPaypal;
        }

          export interface MetaVersion {
            get $beanFullName(): 'a-paypal.meta.version';
            get $onionName(): 'a-paypal:version';
            
          } 
}
/** meta: end */
/** config: begin */
export * from '../config/config.ts';
import type { config } from '../config/config.ts';
/** config: end */
/** locale: begin */
import { locales } from './locales.ts';
/** locale: end */
/** error: begin */
export * from '../config/errors.ts';
import type { errors } from '../config/errors.ts';
/** error: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, type TypeModuleConfig, type TypeModuleErrors, type TypeModuleLocales, type TypeLocaleBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAPaypal extends BeanScopeBase {}

export interface ScopeModuleAPaypal {
  util: BeanScopeUtil;
config: TypeModuleConfig<typeof config>;
error: TypeModuleErrors<typeof errors>;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
entity: IModuleEntity;
model: IModuleModel;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-paypal': ScopeModuleAPaypal;
  }

  export interface IBeanScopeContainer {
    paypal: ScopeModuleAPaypal;
  }
  
  export interface IBeanScopeConfig {
    'a-paypal': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-paypal': (typeof locales)[TypeLocaleBase];
  }

  export interface IBeanScopeErrors {
    'a-paypal': typeof errors;
  }
}
/** scope: end */
