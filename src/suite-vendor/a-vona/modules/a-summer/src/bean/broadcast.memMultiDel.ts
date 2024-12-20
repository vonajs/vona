import { BeanBroadcastBase, Broadcast, IBroadcastExecute } from 'vona-module-a-broadcast';
import { IDecoratorSummerCacheOptions, TSummerCacheActionOptions } from '../types/summerCache.js';
import { cast } from 'vona';

export type TypeBroadcastMemMultiDelJobData = {
  cacheName: string;
  cacheOptions: IDecoratorSummerCacheOptions;
  keysHash: string[];
  keys: unknown[];
  options?: TSummerCacheActionOptions<any, any>;
};

@Broadcast()
export class BroadcastMemMultiDel
  extends BeanBroadcastBase<TypeBroadcastMemMultiDelJobData>
  implements IBroadcastExecute<TypeBroadcastMemMultiDelJobData>
{
  async execute(data: TypeBroadcastMemMultiDelJobData, isEmitter?: boolean) {
    const { cacheName, cacheOptions, keysHash, keys, options } = data;
    if (!isEmitter) {
      const cache = this.app.bean.summer.cache(cacheName, cacheOptions);
      cast(cache).localMem.__mdelRaw(keysHash, keys, options);
    }
  }
}
