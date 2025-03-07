import type { ClusterOptions, RedisOptions } from 'ioredis';

export interface IRedisClientRecord {
  default: never;
  redlock: never;
  queue: never;
  broadcast: never;
  cache: never;
  io: never;
  auth: never;
  summer: never;
  model: never;
}

export interface ConfigRedisCluster extends ClusterOptions {
  nodes: RedisOptions[];
}

export interface ConfigRedis {
  default: RedisOptions;
  clients: Record<keyof IRedisClientRecord, RedisOptions | ConfigRedisCluster>;
}

declare module 'vona' {
  export interface VonaConfig {
    redis: ConfigRedis;
  }
}
