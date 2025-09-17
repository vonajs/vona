import type { OmitNever } from 'vona';
import type { IOnionOptionsEnable, ServiceOnion } from 'vona-module-a-onion';
import type { IRedisClientRecord } from 'vona-module-a-redis';

export interface ICacheRedisRecord {}

export interface IDecoratorCacheRedisOptions extends IOnionOptionsEnable {
  ttl?: number;
  updateAgeOnGet?: boolean;
  client?: keyof IRedisClientRecord;
  disableInstance?: boolean;
  disableTransactionCompensate?: boolean;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    cacheRedis: ServiceOnion<ICacheRedisRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    cacheRedis: OmitNever<ICacheRedisRecord>;
  }

  export interface IBeanSceneRecord {
    cacheRedis: never;
  }
}
