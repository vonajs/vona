import { OmitNever } from 'vona';
import { IOnionOptionsEnable, ServiceOnion } from 'vona-module-a-onion';

export interface ICacheRedisRecord {}

export interface IDecoratorCacheRedisOptions extends IOnionOptionsEnable {
  ttl: number;
  client?: string;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    cacheRedis: ServiceOnion<IDecoratorCacheRedisOptions, keyof ICacheRedisRecord>;
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
