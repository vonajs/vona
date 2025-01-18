/** cacheRedis: begin */
export * from '../bean/cacheRedis.usersDemo.js';

import { IDecoratorCacheRedisOptions } from 'vona-module-a-cache';
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
/** cacheRedis: end */
/** cacheRedis: begin */
import { CacheRedisUsersDemo } from '../bean/cacheRedis.usersDemo.js';
export interface IModuleCacheRedis {
  usersDemo: CacheRedisUsersDemo;
}
/** cacheRedis: end */
/** service: begin */
export * from '../service/passportAdapter.js';

import 'vona';
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
/** service: end */
/** service: begin */
import { ServicePassportAdapter } from '../service/passportAdapter.js';
export interface IModuleService {
  passportAdapter: ServicePassportAdapter;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'home-user.service.passportAdapter': ServicePassportAdapter;
  }
}
/** service: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleHomeUser extends BeanScopeBase {}

export interface ScopeModuleHomeUser {
  util: BeanScopeUtil;
  cacheRedis: IModuleCacheRedis;
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
}

/** scope: end */
