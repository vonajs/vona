import { IDecoratorSummerCacheOptions } from './summerCache.js';

export interface IModelRecord {}

export interface IDecoratorModelOptions<T extends object = {}> {
  entity?: T;
  table?: string;
  disableDeleted?: boolean;
  disableInstance?: boolean;
  disableUpdateTime?: boolean;
  cacheOptions?: IDecoratorSummerCacheOptions;
  cacheKeyAux?: string;
  cacheNotKey?: boolean;
}
