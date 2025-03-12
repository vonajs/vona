import type { BeanScopeUtil, TypeModuleConfig } from 'vona';
/** cacheRedis: begin */
import type { IDecoratorCacheRedisOptions } from 'vona-module-a-cache';

/** cacheRedis: end */
/** cacheRedis: begin */
import type { CacheRedisUsersDemo } from '../bean/cacheRedis.usersDemo.ts';
import type { config } from '../config/config.ts';
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

export * from '../bean/cacheRedis.usersDemo.ts';
declare module 'vona-module-a-cache' {

  export interface ICacheRedisRecord {
    'home-user:usersDemo': IDecoratorCacheRedisOptions;
  }

}
declare module 'vona-module-home-user' {

  export interface CacheRedisUsersDemo {
    /** @internal */
    get scope(): ScopeModuleHomeUser;
  }
}
export interface IModuleCacheRedis {
  usersDemo: CacheRedisUsersDemo;
}
/** service: end */
/** config: begin */
export * from '../config/config.ts';
/** cacheRedis: end */
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
  cacheRedis: IModuleCacheRedis;
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
