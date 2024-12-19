/** bean: begin */
export * from '../bean/bean.redis.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-redis' {
  export interface BeanRedis {
    /** @internal */
    get scope(): ScopeModuleARedis;
  }
}
/** bean: end */
/** bean: begin */
import { BeanRedis } from '../bean/bean.redis.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    redis: BeanRedis;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/redisClient.js';

import 'vona';
declare module 'vona' {
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
/** service: end */
/** service: begin */
import { ServiceRedisClient } from '../service/redisClient.js';
export interface IModuleService {
  redisClient: ServiceRedisClient;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-redis.service.redisClient': ServiceRedisClient;
  }
}
/** service: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil } from 'vona';

@Scope()
export class ScopeModuleARedis extends BeanScopeBase {}

export interface ScopeModuleARedis {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-redis': ScopeModuleARedis;
  }

  export interface IBeanScopeContainer {
    redis: ScopeModuleARedis;
  }
}

/** scope: end */
