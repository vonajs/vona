import type { BeanScopeUtil, TypeModuleConfig } from 'vona';
import type { IDecoratorModelOptions } from 'vona-module-a-database';
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
import type { IEntityOptionsUser } from '../entity/user.ts';
/** entity: end */
/** entity: begin */
import type { EntityUser } from '../entity/user.ts';

/** model: end */
/** model: begin */
import type { ModelUser } from '../model/user.ts';
/** service: end */
/** service: begin */
import type { ServiceAuthInnerAdapter } from '../service/authInnerAdapter.ts';
import type { ServiceAuthTokenAdapter } from '../service/authTokenAdapter.ts';
import type { ServicePassportAdapter } from '../service/passportAdapter.ts';
import type { ServiceRedisToken } from '../service/redisToken.ts';
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
export * from '../bean/meta.version.ts';
declare module 'vona-module-a-database' {

  export interface IEntityRecord {
    'home-user:user': IEntityOptionsUser;
  }

}
declare module 'vona-module-home-user' {

}
export interface IModuleEntity {
  user: EntityUser;
}
/** entity: end */
/** entity: begin */
declare module 'vona-module-home-user' {

  export interface EntityUser {
    $column: <K extends keyof Omit<EntityUser, '$column' | '$columns' | '$table'>>(column: K) => K;
    $columns: <K extends keyof Omit<EntityUser, '$column' | '$columns' | '$table'>>(...columns: K[]) => K[];
  }

  export interface IEntityOptionsUser {
    fields?: TypeEntityOptionsFields<EntityUser, IEntityOptionsUser['fieldsMore']>;
  }
}
/** controller: end */
/** config: begin */
export * from '../config/config.ts';
declare module 'vona-module-a-database' {

  export interface IModelRecord {
    'home-user:user': IDecoratorModelOptions;
  }

}
declare module 'vona-module-home-user' {

  export interface ModelUser {
    /** @internal */
    get scope(): ScopeModuleHomeUser;
  }
}
export interface IModuleModel {
  user: ModelUser;
}
/** service: end */
/** controller: begin */
export * from '../controller/passport.ts';
declare module 'vona' {

  export interface IMetaRecord {
    'home-user:version': never;
  }

}
declare module 'vona-module-home-user' {

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
declare module 'vona-module-a-web' {

  export interface IDtoRecord {
    'home-user:auth': IDtoOptionsAuth;
    'home-user:passport': IDtoOptionsPassport;
    'home-user:passportJwt': IDtoOptionsPassportJwt;
  }

}
declare module 'vona-module-home-user' {

}
declare module 'vona-module-home-user' {

  export interface IDtoOptionsAuth {
    fields?: TypeEntityOptionsFields<DtoAuth, IDtoOptionsAuth['fieldsMore']>;
  }

  export interface IDtoOptionsPassport {
    fields?: TypeEntityOptionsFields<DtoPassport, IDtoOptionsPassport['fieldsMore']>;
  }

  export interface IDtoOptionsPassportJwt {
    fields?: TypeEntityOptionsFields<DtoPassportJwt, IDtoOptionsPassportJwt['fieldsMore']>;
  }
}
/** entity: begin */
export * from '../entity/user.ts';
/** entity: end */
/** model: begin */
export * from '../model/user.ts';
/** dto: end */
/** service: begin */
export * from '../service/authInnerAdapter.ts';
export * from '../service/authTokenAdapter.ts';
export * from '../service/passportAdapter.ts';
declare module 'vona-module-a-web' {

  export interface IServiceRecord {
    'home-user:authInnerAdapter': never;
    'home-user:authTokenAdapter': never;
    'home-user:passportAdapter': never;
    'home-user:redisToken': never;
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
  userInnerAdapter: ServiceUserInnerAdapter;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'home-user.service.authInnerAdapter': ServiceAuthInnerAdapter;
    'home-user.service.authTokenAdapter': ServiceAuthTokenAdapter;
    'home-user.service.passportAdapter': ServicePassportAdapter;
    'home-user.service.redisToken': ServiceRedisToken;
    'home-user.service.userInnerAdapter': ServiceUserInnerAdapter;
  }
}
export * from '../service/redisToken.ts';
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
