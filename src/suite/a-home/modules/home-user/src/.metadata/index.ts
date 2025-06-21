import type { BeanScopeUtil, TypeModuleConfig } from 'vona';
import type { TypeMetaEntity } from 'vona-module-a-database';
import type { IDecoratorModelOptions } from 'vona-module-a-database';
import type { IMetaOptionsIndex } from 'vona-module-a-index';
import type { TypeControllerOptionsActions } from 'vona-module-a-openapi';
import type { TypeEntityOptionsFields } from 'vona-module-a-openapi';
import type { config } from '../config/config.ts';
import type { IControllerOptionsPassport } from '../controller/passport.ts';
/** controller: end */
/** controller: begin */
// @ts-ignore ignore
import type { ControllerPassport } from '../controller/passport.ts';
import type { IDtoOptionsAuth } from '../dto/auth.ts';

/** dto: end */
/** dto: begin */
import type { DtoAuth } from '../dto/auth.ts';
import type { IDtoOptionsPassport } from '../dto/passport.ts';
import type { DtoPassport } from '../dto/passport.ts';
import type { IDtoOptionsPassportJwt } from '../dto/passportJwt.ts';
import type { DtoPassportJwt } from '../dto/passportJwt.ts';
import type { IEntityOptionsRole } from '../entity/role.ts';
/** entity: end */
/** entity: begin */
import type { EntityRole } from '../entity/role.ts';
import type { IEntityOptionsUser } from '../entity/user.ts';
import type { EntityUser } from '../entity/user.ts';
import type { IEntityOptionsUserRole } from '../entity/userRole.ts';
import type { EntityUserRole } from '../entity/userRole.ts';
/** model: end */
/** model: begin */
import type { ModelRole } from '../model/role.ts';
import type { ModelUser } from '../model/user.ts';

import type { ModelUserRole } from '../model/userRole.ts';
/** service: end */
/** service: begin */
import type { ServiceAuthInnerAdapter } from '../service/authInnerAdapter.ts';
import type { ServiceAuthTokenAdapter } from '../service/authTokenAdapter.ts';
import type { ServicePassportAdapter } from '../service/passportAdapter.ts';
import type { ServiceRedisToken } from '../service/redisToken.ts';
import type { ServiceRoleInnerAdapter } from '../service/roleInnerAdapter.ts';
import type { ServiceUserInnerAdapter } from '../service/userInnerAdapter.ts';
/** config: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
/** service: end */
/** service: begin */

import { Scope } from 'vona-module-a-bean';
import 'vona';
import 'vona';
import 'vona';
import 'vona';
import 'vona';
import 'vona';

import 'vona';
/** model: end */
/** meta: begin */
export * from '../bean/meta.index.ts';
export * from '../bean/meta.version.ts';
/** controller: end */
/** config: begin */
export * from '../config/config.ts';
declare module 'vona-module-a-database' {

  export interface IEntityRecord {
    'home-user:role': Omit<IEntityOptionsRole, '_fieldsMore_'>;
    'home-user:user': Omit<IEntityOptionsUser, '_fieldsMore_'>;
    'home-user:userRole': Omit<IEntityOptionsUserRole, '_fieldsMore_'>;
  }

}
declare module 'vona-module-home-user' {

}
export interface IModuleEntity {
  role: TypeMetaEntity<EntityRole>;
  user: TypeMetaEntity<EntityUser>;
  userRole: TypeMetaEntity<EntityUserRole>;
}
/** entity: end */
/** entity: begin */
declare module 'vona-module-home-user' {

  export interface EntityRole {
    get $table(): 'homeRole';
    $column: <K extends keyof Omit<EntityRole, '$column' | '$columns' | '$table'>>(column: K) => K;
    $columns: <K extends keyof Omit<EntityRole, '$column' | '$columns' | '$table'>>(...columns: K[]) => K[];
  }

  export interface EntityUser {
    get $table(): 'homeUser';
    $column: <K extends keyof Omit<EntityUser, '$column' | '$columns' | '$table'>>(column: K) => K;
    $columns: <K extends keyof Omit<EntityUser, '$column' | '$columns' | '$table'>>(...columns: K[]) => K[];
  }

  export interface EntityUserRole {
    get $table(): 'homeUserRole';
    $column: <K extends keyof Omit<EntityUserRole, '$column' | '$columns' | '$table'>>(column: K) => K;
    $columns: <K extends keyof Omit<EntityUserRole, '$column' | '$columns' | '$table'>>(...columns: K[]) => K[];
  }

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
/** service: end */
/** controller: begin */
export * from '../controller/passport.ts';
/** meta: end */
/** dto: begin */
export * from '../dto/auth.ts';
export * from '../dto/passport.ts';
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
export interface IModuleModel {
  role: ModelRole;
  user: ModelUser;
  userRole: ModelUserRole;
}
export * from '../dto/passportJwt.ts';
/** entity: begin */
export * from '../entity/role.ts';
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
export * from '../entity/user.ts';
export * from '../entity/userRole.ts';
/** entity: end */
/** model: begin */
export * from '../model/role.ts';
declare module 'vona-module-a-web' {

  export interface IDtoRecord {
    'home-user:auth': Omit<IDtoOptionsAuth, '_fieldsMore_'>;
    'home-user:passport': Omit<IDtoOptionsPassport, '_fieldsMore_'>;
    'home-user:passportJwt': Omit<IDtoOptionsPassportJwt, '_fieldsMore_'>;
  }

}
declare module 'vona-module-home-user' {

}
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
export * from '../model/user.ts';
export * from '../model/userRole.ts';
/** dto: end */
/** service: begin */
export * from '../service/authInnerAdapter.ts';
export * from '../service/authTokenAdapter.ts';
export * from '../service/passportAdapter.ts';
export * from '../service/redisToken.ts';
declare module 'vona-module-a-web' {

  export interface IServiceRecord {
    'home-user:authInnerAdapter': never;
    'home-user:authTokenAdapter': never;
    'home-user:passportAdapter': never;
    'home-user:redisToken': never;
    'home-user:roleInnerAdapter': never;
    'home-user:userInnerAdapter': never;
  }

}
declare module 'vona-module-home-user' {

  export interface ServiceAuthInnerAdapter {
    /** @internal */
    get scope(): ScopeModuleHomeUser;
  }

  export interface ServiceAuthTokenAdapter {
    /** @internal */
    get scope(): ScopeModuleHomeUser;
  }

  export interface ServicePassportAdapter {
    /** @internal */
    get scope(): ScopeModuleHomeUser;
  }

  export interface ServiceRedisToken {
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
export interface IModuleService {
  authInnerAdapter: ServiceAuthInnerAdapter;
  authTokenAdapter: ServiceAuthTokenAdapter;
  passportAdapter: ServicePassportAdapter;
  redisToken: ServiceRedisToken;
  roleInnerAdapter: ServiceRoleInnerAdapter;
  userInnerAdapter: ServiceUserInnerAdapter;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'home-user.service.authInnerAdapter': ServiceAuthInnerAdapter;
    'home-user.service.authTokenAdapter': ServiceAuthTokenAdapter;
    'home-user.service.passportAdapter': ServicePassportAdapter;
    'home-user.service.redisToken': ServiceRedisToken;
    'home-user.service.roleInnerAdapter': ServiceRoleInnerAdapter;
    'home-user.service.userInnerAdapter': ServiceUserInnerAdapter;
  }
}
export * from '../service/roleInnerAdapter.ts';
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
declare module 'vona-module-home-user' {

  export interface IControllerOptionsPassport {
    actions?: TypeControllerOptionsActions<ControllerPassport>;
  }
}
declare module 'vona-module-a-web' {
  export interface IApiPathGetRecord {
    '/home/user/passport/current': undefined;
    '/home/user/passport/login/:module/:providerName/:clientName?': undefined;
    '/home/user/passport/associate/:module/:providerName/:clientName?': undefined;
    '/home/user/passport/migrate/:module/:providerName/:clientName?': undefined;
  }
  export interface IApiPathPostRecord {
    '/home/user/passport/logout': undefined;
    '/home/user/passport/login': undefined;
    '/home/user/passport/refreshAuthToken': undefined;
    '/home/user/passport/createPassportJwtFromOauthCode': undefined;
  }

}
export * from '../service/userInnerAdapter.ts';

@Scope()
export class ScopeModuleHomeUser extends BeanScopeBase {}

export interface ScopeModuleHomeUser {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  entity: IModuleEntity;
  model: IModuleModel;
  service: IModuleService;
}
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
