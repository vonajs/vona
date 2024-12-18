import { ClusterOptions, RedisOptions } from 'ioredis';

export interface ConfigRedisCluster extends ClusterOptions {
  nodes: RedisOptions[];
}
export interface ConfigRedis {
  default: RedisOptions;
  clients: Record<string, RedisOptions | ConfigRedisCluster>;
}

declare module 'vona' {
  export interface VonaConfig {
    redis: ConfigRedis;
  }
}
