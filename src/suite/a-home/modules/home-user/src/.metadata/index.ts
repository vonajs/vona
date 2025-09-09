/* eslint-disable */
import type { TypeEntityMeta,TypeModelsClassLikeGeneral,TypeSymbolKeyFieldsMore,IModelRelationBelongsToMany } from 'vona-module-a-orm';
import type { TypeEntityOptionsFields,TypeControllerOptionsActions } from 'vona-module-a-openapi';
import type { TableIdentity } from 'table-identity';
/** entity: begin */
export * from '../entity/role.ts';
export * from '../entity/roleUser.ts';
export * from '../entity/user.ts';
import type { IEntityOptionsRole } from '../entity/role.ts';
import type { IEntityOptionsRoleUser } from '../entity/roleUser.ts';
import type { IEntityOptionsUser } from '../entity/user.ts';
import 'vona';
declare module 'vona-module-a-orm' {
  
    export interface IEntityRecord {
      'home-user:role': IEntityOptionsRole;
'home-user:roleUser': IEntityOptionsRoleUser;
'home-user:user': IEntityOptionsUser;
    }

  
}
declare module 'vona-module-home-user' {
   
}
/** entity: end */
/** entity: begin */
import type { EntityRole } from '../entity/role.ts';
import type { EntityRoleUser } from '../entity/roleUser.ts';
import type { EntityUser } from '../entity/user.ts';
export interface IModuleEntity {
  'role': EntityRoleMeta;
'roleUser': EntityRoleUserMeta;
'user': EntityUserMeta;
}
/** entity: end */
/** entity: begin */
export type EntityRoleTableName = 'homeRole';
export type EntityRoleUserTableName = 'homeRoleUser';
export type EntityUserTableName = 'homeUser';
export type EntityRoleMeta=TypeEntityMeta<EntityRole,EntityRoleTableName>;
export type EntityRoleUserMeta=TypeEntityMeta<EntityRoleUser,EntityRoleUserTableName>;
export type EntityUserMeta=TypeEntityMeta<EntityUser,EntityUserTableName>;
declare module 'vona-module-a-orm' {
  export interface ITableRecord {
    'homeRole': never;
'homeRoleUser': never;
'homeUser': never;
  }
}
declare module 'vona-module-home-user' {
  
    export interface IEntityOptionsRole {
      fields?: TypeEntityOptionsFields<EntityRole, IEntityOptionsRole[TypeSymbolKeyFieldsMore]>;
    }

    export interface IEntityOptionsRoleUser {
      fields?: TypeEntityOptionsFields<EntityRoleUser, IEntityOptionsRoleUser[TypeSymbolKeyFieldsMore]>;
    }

    export interface IEntityOptionsUser {
      fields?: TypeEntityOptionsFields<EntityUser, IEntityOptionsUser[TypeSymbolKeyFieldsMore]>;
    }
}
/** entity: end */
/** model: begin */
export * from '../model/role.ts';
export * from '../model/roleUser.ts';
export * from '../model/user.ts';
import type { IModelOptionsRole } from '../model/role.ts';
import type { IModelOptionsRoleUser } from '../model/roleUser.ts';
import type { IModelOptionsUser } from '../model/user.ts';
import 'vona';
declare module 'vona-module-a-orm' {
  
    export interface IModelRecord {
      'home-user:role': IModelOptionsRole;
'home-user:roleUser': IModelOptionsRoleUser;
'home-user:user': IModelOptionsUser;
    }

  
}
declare module 'vona-module-home-user' {
  
        export interface ModelRole {
          /** @internal */
          get scope(): ScopeModuleHomeUser;
        }

          export interface ModelRole {
            get $beanFullName(): 'home-user.model.role';
            get $onionName(): 'home-user:role';
          }

        export interface ModelRoleUser {
          /** @internal */
          get scope(): ScopeModuleHomeUser;
        }

          export interface ModelRoleUser {
            get $beanFullName(): 'home-user.model.roleUser';
            get $onionName(): 'home-user:roleUser';
          }

        export interface ModelUser {
          /** @internal */
          get scope(): ScopeModuleHomeUser;
        }

          export interface ModelUser {
            get $beanFullName(): 'home-user.model.user';
            get $onionName(): 'home-user:user';
          } 
}
/** model: end */
/** model: begin */
import type { ModelRole } from '../model/role.ts';
import type { ModelRoleUser } from '../model/roleUser.ts';
import type { ModelUser } from '../model/user.ts';
export interface IModuleModel {
  'role': ModelRole;
'roleUser': ModelRoleUser;
'user': ModelUser;
}
/** model: end */
/** model: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'home-user.model.role': ModelRole;
'home-user.model.roleUser': ModelRoleUser;
'home-user.model.user': ModelUser;
  }
}
/** model: end */
/** model: begin */
import type { IModelGetOptions, IModelMethodOptions, IModelSelectParams, TypeModelSelectAndCount, TypeModelRelationResult, TypeModelWhere, IModelInsertOptions, TypeModelMutateRelationData, IModelDeleteOptions, IModelUpdateOptions, IModelMutateOptions, IModelSelectCountParams, IModelSelectAggrParams, TypeModelAggrRelationResult, IModelSelectGroupParams, TypeModelGroupRelationResult } from 'vona-module-a-orm';
import { SymbolKeyEntity, SymbolKeyEntityMeta, SymbolKeyModelOptions } from 'vona-module-a-orm';
declare module 'vona-module-home-user' {
  export interface IModelOptionsUser {
        relations: {
          roles: IModelRelationBelongsToMany<ModelRoleUser, ModelRole, false, 'id'|'name',undefined,undefined,undefined>;
        };
      }
  export interface ModelRole {
      [SymbolKeyEntity]: EntityRole;
      [SymbolKeyEntityMeta]: EntityRoleMeta;
      [SymbolKeyModelOptions]: IModelOptionsRole;
      get<T extends IModelGetOptions<EntityRole,ModelRole>>(where: TypeModelWhere<EntityRole>, options?: T): Promise<TypeModelRelationResult<EntityRole, ModelRole, T> | undefined>;
      mget<T extends IModelGetOptions<EntityRole,ModelRole>>(ids: TableIdentity[], options?: T): Promise<TypeModelRelationResult<EntityRole, ModelRole, T>[]>;
      selectAndCount<T extends IModelSelectParams<EntityRole,ModelRole,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelSelectAndCount<EntityRole, ModelRole, T>>;
      select<T extends IModelSelectParams<EntityRole,ModelRole,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelRelationResult<EntityRole, ModelRole, T>[]>;
      insert<T extends IModelInsertOptions<EntityRole,ModelRole>>(data?: TypeModelMutateRelationData<EntityRole,ModelRole, T>, options?: T): Promise<TypeModelMutateRelationData<EntityRole,ModelRole, T, true>>;
      insertBulk<T extends IModelInsertOptions<EntityRole,ModelRole>>(items: TypeModelMutateRelationData<EntityRole,ModelRole, T>[], options?: T): Promise<TypeModelMutateRelationData<EntityRole,ModelRole, T, true>[]>;
      update<T extends IModelUpdateOptions<EntityRole,ModelRole>>(data: TypeModelMutateRelationData<EntityRole,ModelRole, T>, options?: T): Promise<TypeModelMutateRelationData<EntityRole,ModelRole, T>>;
      updateBulk<T extends IModelUpdateOptions<EntityRole,ModelRole>>(items: TypeModelMutateRelationData<EntityRole,ModelRole, T>[], options?: T): Promise<TypeModelMutateRelationData<EntityRole,ModelRole, T>[]>;
      delete<T extends IModelDeleteOptions<EntityRole,ModelRole>>(where?: TypeModelWhere<EntityRole>, options?: T): Promise<void>;
      deleteBulk<T extends IModelDeleteOptions<EntityRole,ModelRole>>(ids: TableIdentity[], options?: T): Promise<void>;
      mutate<T extends IModelMutateOptions<EntityRole,ModelRole>>(data?: TypeModelMutateRelationData<EntityRole,ModelRole, T>, options?: T): Promise<TypeModelMutateRelationData<EntityRole,ModelRole, T>>;
      mutateBulk<T extends IModelMutateOptions<EntityRole,ModelRole>>(items: TypeModelMutateRelationData<EntityRole,ModelRole, T>[], options?: T): Promise<TypeModelMutateRelationData<EntityRole,ModelRole, T>[]>;
      count<T extends IModelSelectCountParams<EntityRole,ModelRole,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<BigNumber | undefined>;
      aggregate<T extends IModelSelectAggrParams<EntityRole,ModelRole,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelAggrRelationResult<T>>;
      group<T extends IModelSelectGroupParams<EntityRole,ModelRole,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelGroupRelationResult<EntityRole, T>[]>;
    }
export interface ModelRoleUser {
      [SymbolKeyEntity]: EntityRoleUser;
      [SymbolKeyEntityMeta]: EntityRoleUserMeta;
      [SymbolKeyModelOptions]: IModelOptionsRoleUser;
      get<T extends IModelGetOptions<EntityRoleUser,ModelRoleUser>>(where: TypeModelWhere<EntityRoleUser>, options?: T): Promise<TypeModelRelationResult<EntityRoleUser, ModelRoleUser, T> | undefined>;
      mget<T extends IModelGetOptions<EntityRoleUser,ModelRoleUser>>(ids: TableIdentity[], options?: T): Promise<TypeModelRelationResult<EntityRoleUser, ModelRoleUser, T>[]>;
      selectAndCount<T extends IModelSelectParams<EntityRoleUser,ModelRoleUser,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelSelectAndCount<EntityRoleUser, ModelRoleUser, T>>;
      select<T extends IModelSelectParams<EntityRoleUser,ModelRoleUser,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelRelationResult<EntityRoleUser, ModelRoleUser, T>[]>;
      insert<T extends IModelInsertOptions<EntityRoleUser,ModelRoleUser>>(data?: TypeModelMutateRelationData<EntityRoleUser,ModelRoleUser, T>, options?: T): Promise<TypeModelMutateRelationData<EntityRoleUser,ModelRoleUser, T, true>>;
      insertBulk<T extends IModelInsertOptions<EntityRoleUser,ModelRoleUser>>(items: TypeModelMutateRelationData<EntityRoleUser,ModelRoleUser, T>[], options?: T): Promise<TypeModelMutateRelationData<EntityRoleUser,ModelRoleUser, T, true>[]>;
      update<T extends IModelUpdateOptions<EntityRoleUser,ModelRoleUser>>(data: TypeModelMutateRelationData<EntityRoleUser,ModelRoleUser, T>, options?: T): Promise<TypeModelMutateRelationData<EntityRoleUser,ModelRoleUser, T>>;
      updateBulk<T extends IModelUpdateOptions<EntityRoleUser,ModelRoleUser>>(items: TypeModelMutateRelationData<EntityRoleUser,ModelRoleUser, T>[], options?: T): Promise<TypeModelMutateRelationData<EntityRoleUser,ModelRoleUser, T>[]>;
      delete<T extends IModelDeleteOptions<EntityRoleUser,ModelRoleUser>>(where?: TypeModelWhere<EntityRoleUser>, options?: T): Promise<void>;
      deleteBulk<T extends IModelDeleteOptions<EntityRoleUser,ModelRoleUser>>(ids: TableIdentity[], options?: T): Promise<void>;
      mutate<T extends IModelMutateOptions<EntityRoleUser,ModelRoleUser>>(data?: TypeModelMutateRelationData<EntityRoleUser,ModelRoleUser, T>, options?: T): Promise<TypeModelMutateRelationData<EntityRoleUser,ModelRoleUser, T>>;
      mutateBulk<T extends IModelMutateOptions<EntityRoleUser,ModelRoleUser>>(items: TypeModelMutateRelationData<EntityRoleUser,ModelRoleUser, T>[], options?: T): Promise<TypeModelMutateRelationData<EntityRoleUser,ModelRoleUser, T>[]>;
      count<T extends IModelSelectCountParams<EntityRoleUser,ModelRoleUser,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<BigNumber | undefined>;
      aggregate<T extends IModelSelectAggrParams<EntityRoleUser,ModelRoleUser,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelAggrRelationResult<T>>;
      group<T extends IModelSelectGroupParams<EntityRoleUser,ModelRoleUser,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelGroupRelationResult<EntityRoleUser, T>[]>;
    }
export interface ModelUser {
      [SymbolKeyEntity]: EntityUser;
      [SymbolKeyEntityMeta]: EntityUserMeta;
      [SymbolKeyModelOptions]: IModelOptionsUser;
      get<T extends IModelGetOptions<EntityUser,ModelUser>>(where: TypeModelWhere<EntityUser>, options?: T): Promise<TypeModelRelationResult<EntityUser, ModelUser, T> | undefined>;
      mget<T extends IModelGetOptions<EntityUser,ModelUser>>(ids: TableIdentity[], options?: T): Promise<TypeModelRelationResult<EntityUser, ModelUser, T>[]>;
      selectAndCount<T extends IModelSelectParams<EntityUser,ModelUser,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelSelectAndCount<EntityUser, ModelUser, T>>;
      select<T extends IModelSelectParams<EntityUser,ModelUser,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelRelationResult<EntityUser, ModelUser, T>[]>;
      insert<T extends IModelInsertOptions<EntityUser,ModelUser>>(data?: TypeModelMutateRelationData<EntityUser,ModelUser, T>, options?: T): Promise<TypeModelMutateRelationData<EntityUser,ModelUser, T, true>>;
      insertBulk<T extends IModelInsertOptions<EntityUser,ModelUser>>(items: TypeModelMutateRelationData<EntityUser,ModelUser, T>[], options?: T): Promise<TypeModelMutateRelationData<EntityUser,ModelUser, T, true>[]>;
      update<T extends IModelUpdateOptions<EntityUser,ModelUser>>(data: TypeModelMutateRelationData<EntityUser,ModelUser, T>, options?: T): Promise<TypeModelMutateRelationData<EntityUser,ModelUser, T>>;
      updateBulk<T extends IModelUpdateOptions<EntityUser,ModelUser>>(items: TypeModelMutateRelationData<EntityUser,ModelUser, T>[], options?: T): Promise<TypeModelMutateRelationData<EntityUser,ModelUser, T>[]>;
      delete<T extends IModelDeleteOptions<EntityUser,ModelUser>>(where?: TypeModelWhere<EntityUser>, options?: T): Promise<void>;
      deleteBulk<T extends IModelDeleteOptions<EntityUser,ModelUser>>(ids: TableIdentity[], options?: T): Promise<void>;
      mutate<T extends IModelMutateOptions<EntityUser,ModelUser>>(data?: TypeModelMutateRelationData<EntityUser,ModelUser, T>, options?: T): Promise<TypeModelMutateRelationData<EntityUser,ModelUser, T>>;
      mutateBulk<T extends IModelMutateOptions<EntityUser,ModelUser>>(items: TypeModelMutateRelationData<EntityUser,ModelUser, T>[], options?: T): Promise<TypeModelMutateRelationData<EntityUser,ModelUser, T>[]>;
      count<T extends IModelSelectCountParams<EntityUser,ModelUser,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<BigNumber | undefined>;
      aggregate<T extends IModelSelectAggrParams<EntityUser,ModelUser,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelAggrRelationResult<T>>;
      group<T extends IModelSelectGroupParams<EntityUser,ModelUser,ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelGroupRelationResult<EntityUser, T>[]>;
    }
}
declare module 'vona-module-a-orm' {
  export interface IModelClassRecord {
    'home-user:role': ModelRole;
'home-user:roleUser': ModelRoleUser;
'home-user:user': ModelUser;
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

          export interface ServiceAuthInnerAdapter {
            get $beanFullName(): 'home-user.service.authInnerAdapter';
            get $onionName(): 'home-user:authInnerAdapter';
          }

        export interface ServicePassportAdapter {
          /** @internal */
          get scope(): ScopeModuleHomeUser;
        }

          export interface ServicePassportAdapter {
            get $beanFullName(): 'home-user.service.passportAdapter';
            get $onionName(): 'home-user:passportAdapter';
          }

        export interface ServiceRoleInnerAdapter {
          /** @internal */
          get scope(): ScopeModuleHomeUser;
        }

          export interface ServiceRoleInnerAdapter {
            get $beanFullName(): 'home-user.service.roleInnerAdapter';
            get $onionName(): 'home-user:roleInnerAdapter';
          }

        export interface ServiceUserInnerAdapter {
          /** @internal */
          get scope(): ScopeModuleHomeUser;
        }

          export interface ServiceUserInnerAdapter {
            get $beanFullName(): 'home-user.service.userInnerAdapter';
            get $onionName(): 'home-user:userInnerAdapter';
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
/** eventListener: begin */
export * from '../bean/eventListener.activate.ts';
export * from '../bean/eventListener.emailConfirmCallback.ts';
export * from '../bean/eventListener.passwordResetCallback.ts';
export * from '../bean/eventListener.register.ts';

import { type IDecoratorEventListenerOptions } from 'vona-module-a-event';
declare module 'vona-module-a-event' {
  
    export interface IEventListenerRecord {
      'home-user:activate': IDecoratorEventListenerOptions;
'home-user:emailConfirmCallback': IDecoratorEventListenerOptions;
'home-user:passwordResetCallback': IDecoratorEventListenerOptions;
'home-user:register': IDecoratorEventListenerOptions;
    }

  
}
declare module 'vona-module-home-user' {
  
        export interface EventListenerActivate {
          /** @internal */
          get scope(): ScopeModuleHomeUser;
        }

          export interface EventListenerActivate {
            get $beanFullName(): 'home-user.eventListener.activate';
            get $onionName(): 'home-user:activate';
          }

        export interface EventListenerEmailConfirmCallback {
          /** @internal */
          get scope(): ScopeModuleHomeUser;
        }

          export interface EventListenerEmailConfirmCallback {
            get $beanFullName(): 'home-user.eventListener.emailConfirmCallback';
            get $onionName(): 'home-user:emailConfirmCallback';
          }

        export interface EventListenerPasswordResetCallback {
          /** @internal */
          get scope(): ScopeModuleHomeUser;
        }

          export interface EventListenerPasswordResetCallback {
            get $beanFullName(): 'home-user.eventListener.passwordResetCallback';
            get $onionName(): 'home-user:passwordResetCallback';
          }

        export interface EventListenerRegister {
          /** @internal */
          get scope(): ScopeModuleHomeUser;
        }

          export interface EventListenerRegister {
            get $beanFullName(): 'home-user.eventListener.register';
            get $onionName(): 'home-user:register';
          } 
}
/** eventListener: end */
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

          export interface MetaIndex {
            get $beanFullName(): 'home-user.meta.index';
            get $onionName(): 'home-user:index';
          }

        export interface MetaVersion {
          /** @internal */
          get scope(): ScopeModuleHomeUser;
        }

          export interface MetaVersion {
            get $beanFullName(): 'home-user.meta.version';
            get $onionName(): 'home-user:version';
          } 
}
/** meta: end */
/** dto: begin */
export * from '../dto/auth.ts';
export * from '../dto/login.ts';
export * from '../dto/passport.ts';
export * from '../dto/passportJwt.ts';
export * from '../dto/register.ts';
import type { IDtoOptionsAuth } from '../dto/auth.ts';
import type { IDtoOptionsLogin } from '../dto/login.ts';
import type { IDtoOptionsPassport } from '../dto/passport.ts';
import type { IDtoOptionsPassportJwt } from '../dto/passportJwt.ts';
import type { IDtoOptionsRegister } from '../dto/register.ts';
import 'vona';
declare module 'vona-module-a-web' {
  
    export interface IDtoRecord {
      'home-user:auth': IDtoOptionsAuth;
'home-user:login': IDtoOptionsLogin;
'home-user:passport': IDtoOptionsPassport;
'home-user:passportJwt': IDtoOptionsPassportJwt;
'home-user:register': IDtoOptionsRegister;
    }

  
}
declare module 'vona-module-home-user' {
   
}
/** dto: end */
/** dto: begin */
import type { DtoAuth } from '../dto/auth.ts';
import type { DtoLogin } from '../dto/login.ts';
import type { DtoPassport } from '../dto/passport.ts';
import type { DtoPassportJwt } from '../dto/passportJwt.ts';
import type { DtoRegister } from '../dto/register.ts'; 
declare module 'vona-module-home-user' {
  
    export interface IDtoOptionsAuth {
      fields?: TypeEntityOptionsFields<DtoAuth, IDtoOptionsAuth[TypeSymbolKeyFieldsMore]>;
    }

    export interface IDtoOptionsLogin {
      fields?: TypeEntityOptionsFields<DtoLogin, IDtoOptionsLogin[TypeSymbolKeyFieldsMore]>;
    }

    export interface IDtoOptionsPassport {
      fields?: TypeEntityOptionsFields<DtoPassport, IDtoOptionsPassport[TypeSymbolKeyFieldsMore]>;
    }

    export interface IDtoOptionsPassportJwt {
      fields?: TypeEntityOptionsFields<DtoPassportJwt, IDtoOptionsPassportJwt[TypeSymbolKeyFieldsMore]>;
    }

    export interface IDtoOptionsRegister {
      fields?: TypeEntityOptionsFields<DtoRegister, IDtoOptionsRegister[TypeSymbolKeyFieldsMore]>;
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

          export interface ControllerPassport {
            get $beanFullName(): 'home-user.controller.passport';
            get $onionName(): 'home-user:passport';
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
'/home/user/passport/register': undefined;
'/home/user/passport/login': undefined;
'/home/user/passport/refreshAuthToken': undefined;
'/home/user/passport/createPassportJwtFromOauthCode': undefined;
'/home/user/passport/createTempAuthToken': undefined;
    }

}
/** controller: end */
/** zodRefine: begin */
export * from '../bean/zodRefine.usernameUnique.ts';
import type { IZodRefineOptionsUsernameUnique } from '../bean/zodRefine.usernameUnique.ts';
import 'vona';
declare module 'vona-module-a-zod' {
  
    export interface IZodRefineRecord {
      'home-user:usernameUnique': IZodRefineOptionsUsernameUnique;
    }

  
}
declare module 'vona-module-home-user' {
  
        export interface ZodRefineUsernameUnique {
          /** @internal */
          get scope(): ScopeModuleHomeUser;
        }

          export interface ZodRefineUsernameUnique {
            get $beanFullName(): 'home-user.zodRefine.usernameUnique';
            get $onionName(): 'home-user:usernameUnique';
          } 
}
/** zodRefine: end */
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
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, type TypeModuleConfig, type TypeModuleLocales, type TypeLocaleBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleHomeUser extends BeanScopeBase {}

export interface ScopeModuleHomeUser {
  util: BeanScopeUtil;
config: TypeModuleConfig<typeof config>;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
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

  export interface IBeanScopeLocale {
    'home-user': (typeof locales)[TypeLocaleBase];
  }
}

export function $locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `home-user::${K}` {
  return `home-user::${key}`;
}
/** scope: end */
