import type { BeanScopeUtil, TypeModuleConfig } from 'vona';
/** cacheRedis: begin */
import type { IDecoratorCacheRedisOptions } from 'vona-module-a-cache';

/** cacheRedis: end */
/** cacheRedis: begin */
import type { CacheRedisUsersDemo } from '../bean/cacheRedis.usersDemo.ts';
import type { config } from '../config/config.ts';
/** service: end */
/** service: begin */
import type { ServicePassportAdapter } from '../service/passportAdapter.ts';
import type { ServiceRedisToken } from '../service/redisToken.ts';
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
export * from '../service/passportAdapter.ts';
declare module 'vona-module-a-web' {

  export interface IServiceRecord {
    'home-user:passportAdapter': never;
    'home-user:redisToken': never;
  }

}
declare module 'vona-module-home-user' {

  export interface ServicePassportAdapter {
    /** @internal */
    get scope(): ScopeModuleHomeUser;
  }

  export interface ServiceRedisToken {
    /** @internal */
    get scope(): ScopeModuleHomeUser;
  }
}
export interface IModuleService {
  passportAdapter: ServicePassportAdapter;
  redisToken: ServiceRedisToken;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'home-user.service.passportAdapter': ServicePassportAdapter;
    'home-user.service.redisToken': ServiceRedisToken;
  }
}
export * from '../service/redisToken.ts';

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
