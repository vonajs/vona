/** service: end */
/** scope: begin */
import type { BeanScopeUtil } from 'vona';
/** cacheRedis: begin */
import type { IDecoratorCacheRedisOptions } from 'vona-module-a-cache';

/** cacheRedis: end */
/** cacheRedis: begin */
import type { CacheRedisUsersDemo } from '../bean/cacheRedis.usersDemo.js';
/** service: end */
/** service: begin */
import type { ServicePassportAdapter } from '../service/passportAdapter.js';
/** service: end */
/** service: begin */

import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

export * from '../bean/cacheRedis.usersDemo.js';
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
/** cacheRedis: end */
/** service: begin */
export * from '../service/passportAdapter.js';
declare module 'vona-module-a-web' {
  export interface IServiceRecord {
    'home-user:passportAdapter': never;
  }
}
declare module 'vona-module-home-user' {
  export interface ServicePassportAdapter {
    /** @internal */
    get scope(): ScopeModuleHomeUser;
  }
}
export interface IModuleService {
  passportAdapter: ServicePassportAdapter;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'home-user.service.passportAdapter': ServicePassportAdapter;
  }
}

@Scope()
export class ScopeModuleHomeUser extends BeanScopeBase {}

export interface ScopeModuleHomeUser {
  util: BeanScopeUtil;
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
}

/** scope: end */
