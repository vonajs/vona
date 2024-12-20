import { BeanBroadcastBase, Broadcast, IBroadcastExecute } from 'vona-module-a-broadcast';
import { IDecoratorSummerCacheOptions, TSummerCacheActionOptions } from '../types/summerCache.js';
import { cast } from 'vona';

export type TypeBroadcastMemDelJobData = {
  cacheName: string;
  cacheOptions: IDecoratorSummerCacheOptions;
  keyHash: string;
  key: unknown;
  options?: TSummerCacheActionOptions<any, any>;
};

@Broadcast()
export class BroadcastMemDel
  extends BeanBroadcastBase<TypeBroadcastMemDelJobData>
  implements IBroadcastExecute<TypeBroadcastMemDelJobData>
{
  async execute(data: TypeBroadcastMemDelJobData, isEmitter?: boolean) {
    const { cacheName, cacheOptions, keyHash, key, options } = data;
    if (!isEmitter) {
      const cache = this.app.bean.summer.cache(cacheName, cacheOptions);
      cast(cache).localMem.__delRaw(keyHash, key, options);
    }
  }
}
