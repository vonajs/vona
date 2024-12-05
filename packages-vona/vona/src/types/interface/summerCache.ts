import { IMiddlewareBaseEnable } from './middleware.js';

export interface ISummerCacheRecord {}

export interface IDecoratorSummerCacheOptions extends IMiddlewareBaseEnable {
  preset?: 'redis' | 'all' | 'redisWithIgnoreNull' | 'allWithIgnoreNull';
  mode?: 'all' | 'mem' | 'redis';
  mem?: {
    max?: number;
    ttl?: number;
  };
  redis?: {
    ttl: number;
  };
  ignoreNull?: boolean;
}
