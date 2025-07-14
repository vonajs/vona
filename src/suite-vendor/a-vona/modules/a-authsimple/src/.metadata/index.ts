/* eslint-disable */
import type { TypeSymbolKeyFieldsMore } from 'vona-module-a-database';
import type { TypeEntityMeta } from 'vona-module-a-database';
import type { TypeEntityOptionsFields } from 'vona-module-a-openapi';
/** entity: begin */
export * from '../entity/authSimple.ts';
import type { IEntityOptionsAuthSimple } from '../entity/authSimple.ts';
import 'vona';
declare module 'vona-module-a-database' {
  
    export interface IEntityRecord {
      'a-authsimple:authSimple': IEntityOptionsAuthSimple;
    }

  
}
declare module 'vona-module-a-authsimple' {
   
}
/** entity: end */
/** entity: begin */
import type { EntityAuthSimple } from '../entity/authSimple.ts';
export interface IModuleEntity {
  'authSimple': EntityAuthSimpleMeta;
}
/** entity: end */
/** entity: begin */
export type EntityAuthSimpleTableName = 'aAuthSimple';
export type EntityAuthSimpleMeta=TypeEntityMeta<EntityAuthSimple,EntityAuthSimpleTableName>;
declare module 'vona-module-a-database' {
  export interface ITableRecord {
    'aAuthSimple': never;
  }
}
declare module 'vona-module-a-authsimple' {
  
    export interface IEntityOptionsAuthSimple {
      fields?: TypeEntityOptionsFields<EntityAuthSimple, IEntityOptionsAuthSimple[TypeSymbolKeyFieldsMore]>;
    }
}
/** entity: end */
/** model: begin */
export * from '../model/authSimple.ts';
import type { IModelOptionsAuthSimple } from '../model/authSimple.ts';
import 'vona';
declare module 'vona-module-a-database' {
  
    export interface IModelRecord {
      'a-authsimple:authSimple': IModelOptionsAuthSimple;
    }

  
}
declare module 'vona-module-a-authsimple' {
  
        export interface ModelAuthSimple {
          /** @internal */
          get scope(): ScopeModuleAAuthsimple;
        }

          export interface ModelAuthSimple {
            get $beanFullName(): 'a-authsimple.model.authSimple';
            get $onionName(): 'a-authsimple:authSimple';
          } 
}
/** model: end */
/** model: begin */
import type { ModelAuthSimple } from '../model/authSimple.ts';
export interface IModuleModel {
  'authSimple': ModelAuthSimple;
}
/** model: end */
/** model: begin */
import type { IModelCountParams, IModelGetOptions, IModelMethodOptions, IModelMethodOptionsGeneral, IModelClassRecord, IModelSelectParams, TableIdentity, TypeModelRelationResult, TypeModelWhere } from 'vona-module-a-database';
import { SymbolKeyEntity, SymbolKeyEntityMeta, SymbolKeyModelOptions } from 'vona-module-a-database';
declare module 'vona-module-a-authsimple' {
  export interface ModelAuthSimple {
      [SymbolKeyEntity]: EntityAuthSimple;
      [SymbolKeyEntityMeta]: EntityAuthSimpleMeta;
      [SymbolKeyModelOptions]: IModelOptionsAuthSimple;
      get<T extends IModelGetOptions<EntityAuthSimple,ModelAuthSimple>>(where: TypeModelWhere<EntityAuthSimple>, options?: T): Promise<TypeModelRelationResult<EntityAuthSimple, ModelAuthSimple, T> | undefined>;
      mget<T extends IModelGetOptions<EntityAuthSimple,ModelAuthSimple>>(ids: TableIdentity[], options?: T): Promise<TypeModelRelationResult<EntityAuthSimple, ModelAuthSimple, T>[]>;
      select<T extends IModelSelectParams<EntityAuthSimple,ModelAuthSimple,ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelRelationResult<EntityAuthSimple, ModelAuthSimple, T>[]>;
      count<T extends IModelCountParams<EntityAuthSimple,ModelAuthSimple,ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined>(params?: T, options?: IModelMethodOptionsGeneral, modelJoins?: ModelJoins): Promise<BigNumber>;
    }
  export interface IModelOptionsAuthSimple {
      cache?: {
        keyAux?: keyof EntityAuthSimple;
      };
    }
}
declare module 'vona-module-a-database' {
  export interface IModelClassRecord {
    'a-authsimple:authSimple': ModelAuthSimple;
  }
}
/** model: end */
/** authProvider: begin */
export * from '../bean/authProvider.simple.ts';
import type { IAuthProviderOptionsSimple } from '../bean/authProvider.simple.ts';
import 'vona';
declare module 'vona-module-a-auth' {
  
    export interface IAuthProviderRecord {
      'a-authsimple:simple': IAuthProviderOptionsSimple;
    }

  
}
declare module 'vona-module-a-authsimple' {
  
        export interface AuthProviderSimple {
          /** @internal */
          get scope(): ScopeModuleAAuthsimple;
        }

          export interface AuthProviderSimple {
            get $beanFullName(): 'a-authsimple.authProvider.simple';
            get $onionName(): 'a-authsimple:simple';
          } 
}
/** authProvider: end */
/** authProvider: begin */
import type { AuthProviderSimple } from '../bean/authProvider.simple.ts';
export interface IModuleAuthProvider {
  'simple': AuthProviderSimple;
}
/** authProvider: end */
/** bean: begin */
export * from '../bean/bean.authSimple.ts';

import 'vona';
declare module 'vona' {
  
  
}
declare module 'vona-module-a-authsimple' {
  
        export interface BeanAuthSimple {
          /** @internal */
          get scope(): ScopeModuleAAuthsimple;
        } 
}
/** bean: end */
/** bean: begin */
import type { BeanAuthSimple } from '../bean/bean.authSimple.ts';
import 'vona';  
declare module 'vona' {
  export interface IBeanRecordGlobal {
    'authSimple': BeanAuthSimple;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/authSimple.ts';

import 'vona';
declare module 'vona-module-a-bean' {
  
    export interface IServiceRecord {
      'a-authsimple:authSimple': never;
    }

  
}
declare module 'vona-module-a-authsimple' {
  
        export interface ServiceAuthSimple {
          /** @internal */
          get scope(): ScopeModuleAAuthsimple;
        }

          export interface ServiceAuthSimple {
            get $beanFullName(): 'a-authsimple.service.authSimple';
            get $onionName(): 'a-authsimple:authSimple';
          } 
}
/** service: end */
/** service: begin */
import type { ServiceAuthSimple } from '../service/authSimple.ts';
export interface IModuleService {
  'authSimple': ServiceAuthSimple;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-authsimple.service.authSimple': ServiceAuthSimple;
  }
}
/** service: end */
/** meta: begin */
export * from '../bean/meta.version.ts';

import 'vona';
declare module 'vona' {
  
    export interface IMetaRecord {
      'a-authsimple:version': never;
    }

  
}
declare module 'vona-module-a-authsimple' {
  
        export interface MetaVersion {
          /** @internal */
          get scope(): ScopeModuleAAuthsimple;
        }

          export interface MetaVersion {
            get $beanFullName(): 'a-authsimple.meta.version';
            get $onionName(): 'a-authsimple:version';
          } 
}
/** meta: end */
/** dto: begin */
export * from '../dto/authSimple.ts';
import type { IDtoOptionsAuthSimple } from '../dto/authSimple.ts';
import 'vona';
declare module 'vona-module-a-web' {
  
    export interface IDtoRecord {
      'a-authsimple:authSimple': IDtoOptionsAuthSimple;
    }

  
}
declare module 'vona-module-a-authsimple' {
   
}
/** dto: end */
/** dto: begin */
import type { DtoAuthSimple } from '../dto/authSimple.ts'; 
declare module 'vona-module-a-authsimple' {
  
    export interface IDtoOptionsAuthSimple {
      fields?: TypeEntityOptionsFields<DtoAuthSimple, IDtoOptionsAuthSimple[TypeSymbolKeyFieldsMore]>;
    }
}
/** dto: end */
/** config: begin */
export * from '../config/config.ts';
import type { config } from '../config/config.ts';
/** config: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, type TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAAuthsimple extends BeanScopeBase {}

export interface ScopeModuleAAuthsimple {
  util: BeanScopeUtil;
config: TypeModuleConfig<typeof config>;
entity: IModuleEntity;
model: IModuleModel;
authProvider: IModuleAuthProvider;
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

  
}

/** scope: end */
