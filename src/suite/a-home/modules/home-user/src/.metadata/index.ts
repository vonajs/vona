import type { BeanScopeUtil, TypeModuleConfig } from 'vona';
/** model: end */
/** meta: begin */
import type { IDecoratorEntityOptions } from 'vona-module-a-database';

import type { IDecoratorModelOptions } from 'vona-module-a-database';
import type { config } from '../config/config.ts';

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
/** service: end */
/** service: begin */

/** config: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
import 'vona';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/meta.version.ts';
declare module 'vona-module-a-database' {

  export interface IEntityRecord {
    'home-user:user': IDecoratorEntityOptions;
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
    $column: <K extends keyof Omit<EntityUser, 'column' | 'columns' | 'table'>>(column: K) => K;
    $columns: <K extends keyof Omit<EntityUser, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** service: end */
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
/** entity: begin */
export * from '../entity/user.ts';
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
/** entity: end */
/** model: begin */
export * from '../model/user.ts';
/** meta: end */
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
