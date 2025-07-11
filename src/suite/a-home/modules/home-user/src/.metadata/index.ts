/* eslint-disable */
import type { TypeSymbolKeyFieldsMore } from 'vona-module-a-database';
import type { TypeEntityMeta } from 'vona-module-a-database';
import type { TypeControllerOptionsActions } from 'vona-module-a-openapi';
import type { TypeEntityOptionsFields } from 'vona-module-a-openapi';
/** entity: begin */
export * from '../entity/role.ts';
export * from '../entity/user.ts';
export * from '../entity/userRole.ts';
import type { IEntityOptionsRole } from '../entity/role.ts';
import type { IEntityOptionsUser } from '../entity/user.ts';
import type { IEntityOptionsUserRole } from '../entity/userRole.ts';
import 'vona';
declare module 'vona-module-a-database' {
  
    export interface IEntityRecord {
      'home-user:role': IEntityOptionsRole;
'home-user:user': IEntityOptionsUser;
'home-user:userRole': IEntityOptionsUserRole;
    }

  
}
declare module 'vona-module-home-user' {
   
}
/** entity: end */
/** entity: begin */
import type { EntityRole } from '../entity/role.ts';
import type { EntityUser } from '../entity/user.ts';
import type { EntityUserRole } from '../entity/userRole.ts';
export interface IModuleEntity {
  'role': EntityRoleMeta;
'user': EntityUserMeta;
'userRole': EntityUserRoleMeta;
}
/** entity: end */
/** entity: begin */
export type EntityRoleTableName = 'homeRole';
export type EntityUserTableName = 'homeUser';
export type EntityUserRoleTableName = 'homeUserRole';
export type EntityRoleMeta=TypeEntityMeta<EntityRole,EntityRoleTableName>;
export type EntityUserMeta=TypeEntityMeta<EntityUser,EntityUserTableName>;
export type EntityUserRoleMeta=TypeEntityMeta<EntityUserRole,EntityUserRoleTableName>;
declare module 'vona-module-a-database' {
  export interface ITableRecord {
    'homeRole': never;
'homeUser': never;
'homeUserRole': never;
  }
}
declare module 'vona-module-home-user' {
  
    export interface IEntityOptionsRole {
      fields?: TypeEntityOptionsFields<EntityRole, IEntityOptionsRole[TypeSymbolKeyFieldsMore]>;
    }

    export interface IEntityOptionsUser {
      fields?: TypeEntityOptionsFields<EntityUser, IEntityOptionsUser[TypeSymbolKeyFieldsMore]>;
    }

    export interface IEntityOptionsUserRole {
      fields?: TypeEntityOptionsFields<EntityUserRole, IEntityOptionsUserRole[TypeSymbolKeyFieldsMore]>;
    }
}
/** entity: end */
/** model: begin */
export * from '../model/role.ts';
export * from '../model/user.ts';
export * from '../model/userRole.ts';
import type { IModelOptionsRole } from '../model/role.ts';
import type { IModelOptionsUser } from '../model/user.ts';
import type { IModelOptionsUserRole } from '../model/userRole.ts';
import 'vona';
declare module 'vona-module-a-database' {
  
    export interface IModelRecord {
      'home-user:role': IModelOptionsRole;
'home-user:user': IModelOptionsUser;
'home-user:userRole': IModelOptionsUserRole;
    }

  
}
declare module 'vona-module-home-user' {
  
        export interface ModelRole {
          /** @internal */
          get scope(): ScopeModuleHomeUser;
        }

        export interface ModelUser {
          /** @internal */
          get scope(): ScopeModuleHomeUser;
        }

        export interface ModelUserRole {
          /** @internal */
          get scope(): ScopeModuleHomeUser;
        } 
}
/** model: end */
/** model: begin */
import type { ModelRole } from '../model/role.ts';
import type { ModelUser } from '../model/user.ts';
import type { ModelUserRole } from '../model/userRole.ts';
export interface IModuleModel {
  'role': ModelRole;
'user': ModelUser;
'userRole': ModelUserRole;
}
/** model: end */
/** model: begin */
import type { IModelCountParams, IModelGetOptions, IModelMethodOptions, IModelMethodOptionsGeneral, IModelClassRecord, IModelSelectParams, TableIdentity, TypeModelRelationResult, TypeModelWhere, TypeModelOnionNamesOfModelClass } from 'vona-module-a-database';
import { SymbolKeyEntity, SymbolKeyEntityMeta, SymbolKeyModelOptions } from 'vona-module-a-database';
declare module 'vona-module-home-user' {
  export interface ModelRole {
      [SymbolKeyEntity]: EntityRole;
      [SymbolKeyEntityMeta]: EntityRoleMeta;
      [SymbolKeyModelOptions]: IModelOptionsRole;
      get $beanFullName(): 'home-user.model.role';
      get $onionName(): 'home-user:role';
      get<T extends IModelGetOptions<EntityRole,ModelRole>>(where: TypeModelWhere<EntityRole>, options?: T): Promise<TypeModelRelationResult<EntityRole, ModelRole, T> | undefined>;
      mget<T extends IModelGetOptions<EntityRole,ModelRole>>(ids: TableIdentity[], options?: T): Promise<TypeModelRelationResult<EntityRole, ModelRole, T>[]>;
      select<T extends IModelSelectParams<EntityRole,ModelRole,ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = TypeModelOnionNamesOfModelClass<ModelRole>>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelRelationResult<EntityRole, ModelRole, T>[]>;
      count<T extends IModelCountParams<EntityRole,ModelRole,ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = TypeModelOnionNamesOfModelClass<ModelRole>>(params?: T, options?: IModelMethodOptionsGeneral, modelJoins?: ModelJoins): Promise<BigNumber>;
    }
export interface ModelUser {
      [SymbolKeyEntity]: EntityUser;
      [SymbolKeyEntityMeta]: EntityUserMeta;
      [SymbolKeyModelOptions]: IModelOptionsUser;
      get $beanFullName(): 'home-user.model.user';
      get $onionName(): 'home-user:user';
      get<T extends IModelGetOptions<EntityUser,ModelUser>>(where: TypeModelWhere<EntityUser>, options?: T): Promise<TypeModelRelationResult<EntityUser, ModelUser, T> | undefined>;
      mget<T extends IModelGetOptions<EntityUser,ModelUser>>(ids: TableIdentity[], options?: T): Promise<TypeModelRelationResult<EntityUser, ModelUser, T>[]>;
      select<T extends IModelSelectParams<EntityUser,ModelUser,ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = TypeModelOnionNamesOfModelClass<ModelUser>>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelRelationResult<EntityUser, ModelUser, T>[]>;
      count<T extends IModelCountParams<EntityUser,ModelUser,ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = TypeModelOnionNamesOfModelClass<ModelUser>>(params?: T, options?: IModelMethodOptionsGeneral, modelJoins?: ModelJoins): Promise<BigNumber>;
    }
export interface ModelUserRole {
      [SymbolKeyEntity]: EntityUserRole;
      [SymbolKeyEntityMeta]: EntityUserRoleMeta;
      [SymbolKeyModelOptions]: IModelOptionsUserRole;
      get $beanFullName(): 'home-user.model.userRole';
      get $onionName(): 'home-user:userRole';
      get<T extends IModelGetOptions<EntityUserRole,ModelUserRole>>(where: TypeModelWhere<EntityUserRole>, options?: T): Promise<TypeModelRelationResult<EntityUserRole, ModelUserRole, T> | undefined>;
      mget<T extends IModelGetOptions<EntityUserRole,ModelUserRole>>(ids: TableIdentity[], options?: T): Promise<TypeModelRelationResult<EntityUserRole, ModelUserRole, T>[]>;
      select<T extends IModelSelectParams<EntityUserRole,ModelUserRole,ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = TypeModelOnionNamesOfModelClass<ModelUserRole>>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelRelationResult<EntityUserRole, ModelUserRole, T>[]>;
      count<T extends IModelCountParams<EntityUserRole,ModelUserRole,ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = TypeModelOnionNamesOfModelClass<ModelUserRole>>(params?: T, options?: IModelMethodOptionsGeneral, modelJoins?: ModelJoins): Promise<BigNumber>;
    }
}
declare module 'vona-module-a-database' {
  export interface IModelClassRecord {
    'home-user:role': ModelRole;
'home-user:user': ModelUser;
'home-user:userRole': ModelUserRole;
  }
}
/** model: end */
/** service: begin */
export * from '../service/authInnerAdapter.ts';
export * from '../service/passportAdapter.ts';
export * from '../service/roleInnerAdapter.ts';
export * from '../service/userInnerAdapter.ts';

import 'vona';
declare module 'vona-module-a-bean' {
  
    export interface IServiceRecord {
      'home-user:authInnerAdapter': never;
'home-user:passportAdapter': never;
'home-user:roleInnerAdapter': never;
'home-user:userInnerAdapter': never;
    }

  
}
declare module 'vona-module-home-user' {
  
        export interface ServiceAuthInnerAdapter {
          /** @internal */
          get scope(): ScopeModuleHomeUser;
        }

        export interface ServicePassportAdapter {
          /** @internal */
          get scope(): ScopeModuleHomeUser;
        }

        export interface ServiceRoleInnerAdapter {
          /** @internal */
          get scope(): ScopeModuleHomeUser;
        }

        export interface ServiceUserInnerAdapter {
          /** @internal */
          get scope(): ScopeModuleHomeUser;
        } 
}
/** service: end */
/** service: begin */
import type { ServiceAuthInnerAdapter } from '../service/authInnerAdapter.ts';
import type { ServicePassportAdapter } from '../service/passportAdapter.ts';
import type { ServiceRoleInnerAdapter } from '../service/roleInnerAdapter.ts';
import type { ServiceUserInnerAdapter } from '../service/userInnerAdapter.ts';
export interface IModuleService {
  'authInnerAdapter': ServiceAuthInnerAdapter;
'passportAdapter': ServicePassportAdapter;
'roleInnerAdapter': ServiceRoleInnerAdapter;
'userInnerAdapter': ServiceUserInnerAdapter;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'home-user.service.authInnerAdapter': ServiceAuthInnerAdapter;
'home-user.service.passportAdapter': ServicePassportAdapter;
'home-user.service.roleInnerAdapter': ServiceRoleInnerAdapter;
'home-user.service.userInnerAdapter': ServiceUserInnerAdapter;
  }
}
/** service: end */
/** meta: begin */
export * from '../bean/meta.index.ts';
export * from '../bean/meta.version.ts';
import type { IMetaOptionsIndex } from 'vona-module-a-index';
import 'vona';
declare module 'vona' {
  
    export interface IMetaRecord {
      'home-user:index': IMetaOptionsIndex;
'home-user:version': never;
    }

  
}
declare module 'vona-module-home-user' {
  
        export interface MetaIndex {
          /** @internal */
          get scope(): ScopeModuleHomeUser;
        }

        export interface MetaVersion {
          /** @internal */
          get scope(): ScopeModuleHomeUser;
        } 
}
/** meta: end */
/** dto: begin */
export * from '../dto/auth.ts';
export * from '../dto/passport.ts';
export * from '../dto/passportJwt.ts';
import type { IDtoOptionsAuth } from '../dto/auth.ts';
import type { IDtoOptionsPassport } from '../dto/passport.ts';
import type { IDtoOptionsPassportJwt } from '../dto/passportJwt.ts';
import 'vona';
declare module 'vona-module-a-web' {
  
    export interface IDtoRecord {
      'home-user:auth': IDtoOptionsAuth;
'home-user:passport': IDtoOptionsPassport;
'home-user:passportJwt': IDtoOptionsPassportJwt;
    }

  
}
declare module 'vona-module-home-user' {
   
}
/** dto: end */
/** dto: begin */
import type { DtoAuth } from '../dto/auth.ts';
import type { DtoPassport } from '../dto/passport.ts';
import type { DtoPassportJwt } from '../dto/passportJwt.ts'; 
declare module 'vona-module-home-user' {
  
    export interface IDtoOptionsAuth {
      fields?: TypeEntityOptionsFields<DtoAuth, IDtoOptionsAuth[TypeSymbolKeyFieldsMore]>;
    }

    export interface IDtoOptionsPassport {
      fields?: TypeEntityOptionsFields<DtoPassport, IDtoOptionsPassport[TypeSymbolKeyFieldsMore]>;
    }

    export interface IDtoOptionsPassportJwt {
      fields?: TypeEntityOptionsFields<DtoPassportJwt, IDtoOptionsPassportJwt[TypeSymbolKeyFieldsMore]>;
    }
}
/** dto: end */
/** controller: begin */
export * from '../controller/passport.ts';
import type { IControllerOptionsPassport } from '../controller/passport.ts';
import 'vona';
declare module 'vona-module-a-web' {
  
    export interface IControllerRecord {
      'home-user:passport': IControllerOptionsPassport;
    }

  
}
declare module 'vona-module-home-user' {
  
        export interface ControllerPassport {
          /** @internal */
          get scope(): ScopeModuleHomeUser;
        } 
}
/** controller: end */
/** controller: begin */
// @ts-ignore ignore
import type { ControllerPassport } from '../controller/passport.ts';
declare module 'vona-module-home-user' {
  
    export interface IControllerOptionsPassport {
      actions?: TypeControllerOptionsActions<ControllerPassport>;
    }
}
declare module 'vona-module-a-web' {
  export interface IApiPathGetRecord{
        '/home/user/passport/current': undefined;
'/home/user/passport/login/:module/:providerName/:clientName?': undefined;
'/home/user/passport/associate/:module/:providerName/:clientName?': undefined;
'/home/user/passport/migrate/:module/:providerName/:clientName?': undefined;
    }
export interface IApiPathPostRecord{
        '/home/user/passport/logout': undefined;
'/home/user/passport/login': undefined;
'/home/user/passport/refreshAuthToken': undefined;
'/home/user/passport/createPassportJwtFromOauthCode': undefined;
    }

}
/** controller: end */
/** config: begin */
export * from '../config/config.ts';
import type { config } from '../config/config.ts';
/** config: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, type TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleHomeUser extends BeanScopeBase {}

export interface ScopeModuleHomeUser {
  util: BeanScopeUtil;
config: TypeModuleConfig<typeof config>;
entity: IModuleEntity;
model: IModuleModel;
service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'home-user': ScopeModuleHomeUser;
  }

  export interface IBeanScopeContainer {
    homeUser: ScopeModuleHomeUser;
  }
  
  export interface IBeanScopeConfig {
    'home-user': ReturnType<typeof config>;
  }

  
}

/** scope: end */
