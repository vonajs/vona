/* eslint-disable */
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
      'home-user:role': Omit<IEntityOptionsRole, '_fieldsMore_'>;
'home-user:user': Omit<IEntityOptionsUser, '_fieldsMore_'>;
'home-user:userRole': Omit<IEntityOptionsUserRole, '_fieldsMore_'>;
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
  'role': TypeEntityMeta<EntityRole,EntityRoleTableName>;
'user': TypeEntityMeta<EntityUser,EntityUserTableName>;
'userRole': TypeEntityMeta<EntityUserRole,EntityUserRoleTableName>;
}
/** entity: end */
/** entity: begin */
export type EntityRoleTableName = 'homeRole';
export type EntityUserTableName = 'homeUser';
export type EntityUserRoleTableName = 'homeUserRole';
declare module 'vona-module-a-database' {
  export interface ITableRecord {
    'homeRole': never;
'homeUser': never;
'homeUserRole': never;
  }
}
declare module 'vona-module-home-user' {
  
    export interface IEntityOptionsRole {
      fields?: TypeEntityOptionsFields<EntityRole, IEntityOptionsRole['_fieldsMore_']>;
    }

    export interface IEntityOptionsUser {
      fields?: TypeEntityOptionsFields<EntityUser, IEntityOptionsUser['_fieldsMore_']>;
    }

    export interface IEntityOptionsUserRole {
      fields?: TypeEntityOptionsFields<EntityUserRole, IEntityOptionsUserRole['_fieldsMore_']>;
    }
}
/** entity: end */
/** model: begin */
export * from '../model/role.ts';
export * from '../model/user.ts';
export * from '../model/userRole.ts';

import { type IDecoratorModelOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  
    export interface IModelRecord {
      'home-user:role': IDecoratorModelOptions;
'home-user:user': IDecoratorModelOptions;
'home-user:userRole': IDecoratorModelOptions;
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
      'home-user:auth': Omit<IDtoOptionsAuth, '_fieldsMore_'>;
'home-user:passport': Omit<IDtoOptionsPassport, '_fieldsMore_'>;
'home-user:passportJwt': Omit<IDtoOptionsPassportJwt, '_fieldsMore_'>;
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
      fields?: TypeEntityOptionsFields<DtoAuth, IDtoOptionsAuth['_fieldsMore_']>;
    }

    export interface IDtoOptionsPassport {
      fields?: TypeEntityOptionsFields<DtoPassport, IDtoOptionsPassport['_fieldsMore_']>;
    }

    export interface IDtoOptionsPassportJwt {
      fields?: TypeEntityOptionsFields<DtoPassportJwt, IDtoOptionsPassportJwt['_fieldsMore_']>;
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
