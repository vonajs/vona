import { BeanBroadcastBase, Broadcast, IBroadcastExecute } from 'vona-module-a-broadcast';
import { IDecoratorSummerCacheOptions, TSummerCacheActionOptions } from '../types/summerCache.js';
import { cast } from 'vona';

export type TypeBroadcastMemClearJobData = {
  cacheName: string;
  cacheOptions: IDecoratorSummerCacheOptions;
  options?: TSummerCacheActionOptions<any, any>;
};

@Broadcast()
export class BroadcastMemClear
  extends BeanBroadcastBase<TypeBroadcastMemClearJobData>
  implements IBroadcastExecute<TypeBroadcastMemClearJobData>
{
  async execute(data: TypeBroadcastMemClearJobData, isEmitter?: boolean) {
    const { cacheName, cacheOptions, options } = data;
    if (!isEmitter) {
      const cache = this.app.bean.summer.cache(cacheName, cacheOptions);
      cast(cache).localMem.__clearRaw(options);
    }
  }
}
