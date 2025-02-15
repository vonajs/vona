/** service: end */
/** scope: begin */
import type { BeanScopeUtil } from 'vona';
/** bean: end */
/** bean: begin */
import type { BeanRedis } from '../bean/bean.redis.js';
/** service: end */
/** service: begin */
import type { ServiceRedisClient } from '../service/redisClient.js';

import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** service: end */
/** service: begin */

/** bean: begin */
import 'vona';
import 'vona';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/bean.redis.js';
declare module 'vona' {}
declare module 'vona-module-a-redis' {
  export interface BeanRedis {
    /** @internal */
    get scope(): ScopeModuleARedis;
  }
}
declare module 'vona' {
  export interface IBeanRecordGlobal {
    redis: BeanRedis;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/redisClient.js';
declare module 'vona-module-a-web' {
  export interface IServiceRecord {
    'a-redis:redisClient': never;
  }
}
declare module 'vona-module-a-redis' {
  export interface ServiceRedisClient {
    /** @internal */
    get scope(): ScopeModuleARedis;
  }
}
export interface IModuleService {
  redisClient: ServiceRedisClient;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-redis.service.redisClient': ServiceRedisClient;
  }
}

@Scope()
export class ScopeModuleARedis extends BeanScopeBase {}

export interface ScopeModuleARedis {
  util: BeanScopeUtil;
  service: IModuleService;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-redis': ScopeModuleARedis;
  }

  export interface IBeanScopeContainer {
    redis: ScopeModuleARedis;
  }
}

/** scope: end */
