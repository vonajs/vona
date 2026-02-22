/* eslint-disable */
import type { TypeEntityMeta,TypeModelsClassLikeGeneral,TypeSymbolKeyFieldsMore } from 'vona-module-a-orm';
import type { TypeEntityOptionsFields,TypeControllerOptionsActions } from 'vona-module-a-openapi';
import type { TableIdentity } from 'table-identity';
/** entity: begin */
export * from '../entity/product.tsx';
import type { IEntityOptionsProduct } from '../entity/product.tsx';
import 'vona-module-a-orm';
declare module 'vona-module-a-orm' {
  
    export interface IEntityRecord {
      'start-test:product': IEntityOptionsProduct;
    }

  
}
declare module 'vona-module-start-test' {
   
}
/** entity: end */
/** entity: begin */
import type { EntityProduct } from '../entity/product.tsx';
export interface IModuleEntity {
  'product': EntityProductMeta;
}
/** entity: end */
/** entity: begin */
export type EntityProductTableName = 'startTestProduct';
export type EntityProductMeta=TypeEntityMeta<EntityProduct,EntityProductTableName>;
declare module 'vona-module-a-orm' {
  export interface ITableRecord {
    'startTestProduct': EntityProductMeta;
  }
}
declare module 'vona-module-start-test' {
  
    export interface IEntityOptionsProduct {
      fields?: TypeEntityOptionsFields<EntityProduct, IEntityOptionsProduct[TypeSymbolKeyFieldsMore]>;
    }
}
/** entity: end */
/** model: begin */
export * from '../model/product.ts';
import type { IModelOptionsProduct } from '../model/product.ts';
import 'vona-module-a-orm';
declare module 'vona-module-a-orm' {
  
    export interface IModelRecord {
      'start-test:product': IModelOptionsProduct;
    }

  
}
declare module 'vona-module-start-test' {
  
        export interface ModelProduct {
          /** @internal */
          get scope(): ScopeModuleStartTest;
        }

          export interface ModelProduct {
            get $beanFullName(): 'start-test.model.product';
            get $onionName(): 'start-test:product';
            get $onionOptions(): IModelOptionsProduct;
          } 
}
/** model: end */
/** model: begin */
import type { ModelProduct } from '../model/product.ts';
export interface IModuleModel {
  'product': ModelProduct;
}
/** model: end */
/** model: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'start-test.model.product': ModelProduct;
  }
}
/** model: end */
/** model: begin */
import type { IModelGetOptions, IModelMethodOptions, IModelSelectParams, TypeModelSelectAndCount, TypeModelRelationResult, TypeModelWhere, IModelInsertOptions, TypeModelMutateRelationData, IModelDeleteOptions, IModelUpdateOptions, IModelMutateOptions, IModelSelectCountParams, IModelSelectAggrParams, TypeModelAggrRelationResult, IModelSelectGroupParams, TypeModelGroupRelationResult } from 'vona-module-a-orm';
import { SymbolKeyEntity, SymbolKeyEntityMeta, SymbolKeyModelOptions } from 'vona-module-a-orm';
declare module 'vona-module-start-test' {
  
  export interface ModelProduct {
      [SymbolKeyEntity]: EntityProduct;
      [SymbolKeyEntityMeta]: EntityProductMeta;
      [SymbolKeyModelOptions]: IModelOptionsProduct;
      get<T extends IModelGetOptions<EntityProduct,ModelProduct>>(where: TypeModelWhere<EntityProduct>, options?: T): Promise<TypeModelRelationResult<EntityProduct, ModelProduct, T> | undefined>;
      mget<T extends IModelGetOptions<EntityProduct,ModelProduct>>(ids: TableIdentity[], options?: T): Promise<TypeModelRelationResult<EntityProduct, ModelProduct, T>[]>;
      selectAndCount<T extends IModelSelectParams<EntityProduct,ModelProduct,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelSelectAndCount<EntityProduct, ModelProduct, T>>;
      select<T extends IModelSelectParams<EntityProduct,ModelProduct,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelRelationResult<EntityProduct, ModelProduct, T>[]>;
      insert<T extends IModelInsertOptions<EntityProduct,ModelProduct>>(data?: TypeModelMutateRelationData<EntityProduct,ModelProduct, T>, options?: T): Promise<TypeModelMutateRelationData<EntityProduct,ModelProduct, T, true>>;
      insertBulk<T extends IModelInsertOptions<EntityProduct,ModelProduct>>(items: TypeModelMutateRelationData<EntityProduct,ModelProduct, T>[], options?: T): Promise<TypeModelMutateRelationData<EntityProduct,ModelProduct, T, true>[]>;
      update<T extends IModelUpdateOptions<EntityProduct,ModelProduct>>(data: TypeModelMutateRelationData<EntityProduct,ModelProduct, T>, options?: T): Promise<TypeModelMutateRelationData<EntityProduct,ModelProduct, T>>;
      updateBulk<T extends IModelUpdateOptions<EntityProduct,ModelProduct>>(items: TypeModelMutateRelationData<EntityProduct,ModelProduct, T>[], options?: T): Promise<TypeModelMutateRelationData<EntityProduct,ModelProduct, T>[]>;
      delete<T extends IModelDeleteOptions<EntityProduct,ModelProduct>>(where?: TypeModelWhere<EntityProduct>, options?: T): Promise<void>;
      deleteBulk<T extends IModelDeleteOptions<EntityProduct,ModelProduct>>(ids: TableIdentity[], options?: T): Promise<void>;
      mutate<T extends IModelMutateOptions<EntityProduct,ModelProduct>>(data?: TypeModelMutateRelationData<EntityProduct,ModelProduct, T>, options?: T): Promise<TypeModelMutateRelationData<EntityProduct,ModelProduct, T>>;
      mutateBulk<T extends IModelMutateOptions<EntityProduct,ModelProduct>>(items: TypeModelMutateRelationData<EntityProduct,ModelProduct, T>[], options?: T): Promise<TypeModelMutateRelationData<EntityProduct,ModelProduct, T>[]>;
      count<T extends IModelSelectCountParams<EntityProduct,ModelProduct,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<string | undefined>;
      aggregate<T extends IModelSelectAggrParams<EntityProduct,ModelProduct,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelAggrRelationResult<T>>;
      group<T extends IModelSelectGroupParams<EntityProduct,ModelProduct,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelGroupRelationResult<EntityProduct, T>[]>;
      getById<T extends IModelGetOptions<EntityProduct,ModelProduct>>(id: TableIdentity, options?: T): Promise<TypeModelRelationResult<EntityProduct, ModelProduct, T> | undefined>;
updateById<T extends IModelUpdateOptions<EntityProduct,ModelProduct>>(id: TableIdentity, data: TypeModelMutateRelationData<EntityProduct,ModelProduct, T>, options?: T): Promise<TypeModelMutateRelationData<EntityProduct,ModelProduct, T>>;
deleteById<T extends IModelDeleteOptions<EntityProduct,ModelProduct>>(id: TableIdentity, options?: T): Promise<void>;
getByName<T extends IModelGetOptions<EntityProduct,ModelProduct>>(name?: string, options?: T): Promise<TypeModelRelationResult<EntityProduct, ModelProduct, T> | undefined>;
getByNameEqI<T extends IModelGetOptions<EntityProduct,ModelProduct>>(name?: string, options?: T): Promise<TypeModelRelationResult<EntityProduct, ModelProduct, T> | undefined>;
selectByName<T extends IModelSelectParams<EntityProduct,ModelProduct,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(name?: string, params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelRelationResult<EntityProduct, ModelProduct, T>[]>;
selectByNameEqI<T extends IModelSelectParams<EntityProduct,ModelProduct,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(name?: string, params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelRelationResult<EntityProduct, ModelProduct, T>[]>;
    }
}
declare module 'vona-module-a-orm' {
  export interface IModelClassRecord {
    'start-test:product': ModelProduct;
  }
}
/** model: end */
/** service: begin */
export * from '../service/product.ts';

import 'vona-module-a-bean';
declare module 'vona-module-a-bean' {
  
    export interface IServiceRecord {
      'start-test:product': never;
    }

  
}
declare module 'vona-module-start-test' {
  
        export interface ServiceProduct {
          /** @internal */
          get scope(): ScopeModuleStartTest;
        }

          export interface ServiceProduct {
            get $beanFullName(): 'start-test.service.product';
            get $onionName(): 'start-test:product';
            
          } 
}
/** service: end */
/** service: begin */
import type { ServiceProduct } from '../service/product.ts';
export interface IModuleService {
  'product': ServiceProduct;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'start-test.service.product': ServiceProduct;
  }
}
/** service: end */
/** meta: begin */
export * from '../bean/meta.version.ts';

import 'vona-module-a-meta';
declare module 'vona-module-a-meta' {
  
    export interface IMetaRecord {
      'start-test:version': never;
    }

  
}
declare module 'vona-module-start-test' {
  
        export interface MetaVersion {
          /** @internal */
          get scope(): ScopeModuleStartTest;
        }

          export interface MetaVersion {
            get $beanFullName(): 'start-test.meta.version';
            get $onionName(): 'start-test:version';
            
          } 
}
/** meta: end */
/** dto: begin */
export * from '../dto/productCreate.ts';
export * from '../dto/productQuery.ts';
export * from '../dto/productQueryRes.ts';
export * from '../dto/productUpdate.ts';
import type { IDtoOptionsProductCreate } from '../dto/productCreate.ts';
import type { IDtoOptionsProductQuery } from '../dto/productQuery.ts';
import type { IDtoOptionsProductQueryRes } from '../dto/productQueryRes.ts';
import type { IDtoOptionsProductUpdate } from '../dto/productUpdate.ts';
import 'vona-module-a-web';
declare module 'vona-module-a-web' {
  
    export interface IDtoRecord {
      'start-test:productCreate': IDtoOptionsProductCreate;
'start-test:productQuery': IDtoOptionsProductQuery;
'start-test:productQueryRes': IDtoOptionsProductQueryRes;
'start-test:productUpdate': IDtoOptionsProductUpdate;
    }

  
}
declare module 'vona-module-start-test' {
   
}
/** dto: end */
/** dto: begin */
import type { DtoProductCreate } from '../dto/productCreate.ts';
import type { DtoProductQuery } from '../dto/productQuery.ts';
import type { DtoProductQueryRes } from '../dto/productQueryRes.ts';
import type { DtoProductUpdate } from '../dto/productUpdate.ts'; 
declare module 'vona-module-start-test' {
  
    export interface IDtoOptionsProductCreate {
      fields?: TypeEntityOptionsFields<DtoProductCreate, IDtoOptionsProductCreate[TypeSymbolKeyFieldsMore]>;
    }

    export interface IDtoOptionsProductQuery {
      fields?: TypeEntityOptionsFields<DtoProductQuery, IDtoOptionsProductQuery[TypeSymbolKeyFieldsMore]>;
    }

    export interface IDtoOptionsProductQueryRes {
      fields?: TypeEntityOptionsFields<DtoProductQueryRes, IDtoOptionsProductQueryRes[TypeSymbolKeyFieldsMore]>;
    }

    export interface IDtoOptionsProductUpdate {
      fields?: TypeEntityOptionsFields<DtoProductUpdate, IDtoOptionsProductUpdate[TypeSymbolKeyFieldsMore]>;
    }
}
/** dto: end */
/** controller: begin */
export * from '../controller/product.tsx';
import type { IControllerOptionsProduct } from '../controller/product.tsx';
import 'vona-module-a-web';
declare module 'vona-module-a-web' {
  
    export interface IControllerRecord {
      'start-test:product': IControllerOptionsProduct;
    }

  
}
declare module 'vona-module-start-test' {
  
        export interface ControllerProduct {
          /** @internal */
          get scope(): ScopeModuleStartTest;
        }

          export interface ControllerProduct {
            get $beanFullName(): 'start-test.controller.product';
            get $onionName(): 'start-test:product';
            get $onionOptions(): IControllerOptionsProduct;
          } 
}
/** controller: end */
/** controller: begin */
// @ts-ignore ignore
import type { ControllerProduct } from '../controller/product.tsx';
declare module 'vona-module-start-test' {
  
    export interface IControllerOptionsProduct {
      actions?: TypeControllerOptionsActions<ControllerProduct>;
    }
}
declare module 'vona-module-a-web' {
  export interface IApiPathPostRecord{
        '/start/test/product': undefined;
    }
export interface IApiPathGetRecord{
        '/start/test/product': undefined;
'/start/test/product/:id': undefined;
    }
export interface IApiPathPatchRecord{
        '/start/test/product/:id': undefined;
    }
export interface IApiPathDeleteRecord{
        '/start/test/product/:id': undefined;
    }

}
import 'vona-module-a-openapi';
  declare module 'vona-module-a-openapi' {
    export interface IResourceRecord {
      'start-test:product': never;
    }
  }
  
/** controller: end */
/** ssrMenu: begin */
export * from '../bean/ssrMenu.product.ts';
import type { ISsrMenuOptionsProduct } from '../bean/ssrMenu.product.ts';
import 'vona-module-a-ssr';
declare module 'vona-module-a-ssr' {
  
    export interface ISsrMenuRecord {
      'start-test:product': ISsrMenuOptionsProduct;
    }

  
}
declare module 'vona-module-start-test' {
  
        export interface SsrMenuProduct {
          /** @internal */
          get scope(): ScopeModuleStartTest;
        }

          export interface SsrMenuProduct {
            get $beanFullName(): 'start-test.ssrMenu.product';
            get $onionName(): 'start-test:product';
            get $onionOptions(): ISsrMenuOptionsProduct;
          } 
}
/** ssrMenu: end */
/** locale: begin */
import { locales } from './locales.ts';
/** locale: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, type TypeModuleLocales, type TypeLocaleBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleStartTest extends BeanScopeBase {}

export interface ScopeModuleStartTest {
  util: BeanScopeUtil;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
entity: IModuleEntity;
model: IModuleModel;
service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'start-test': ScopeModuleStartTest;
  }

  export interface IBeanScopeContainer {
    startTest: ScopeModuleStartTest;
  }
  
  

  export interface IBeanScopeLocale {
    'start-test': (typeof locales)[TypeLocaleBase];
  }

  
}
/** scope: end */
