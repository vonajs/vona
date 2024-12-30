import { BeanBroadcastBase, Broadcast, IBroadcastExecute } from 'vona-module-a-broadcast';
import { IDecoratorCacheMemOptions } from '../types/cacheMem.js';
import { cast } from 'vona';

export type TypeBroadcastMemMultiDelJobData = {
  cacheName: string;
  cacheOptions: IDecoratorCacheMemOptions;
  keysHash: string[];
  keys: unknown[];
};

@Broadcast()
export class BroadcastMemMultiDel
  extends BeanBroadcastBase<TypeBroadcastMemMultiDelJobData>
  implements IBroadcastExecute<TypeBroadcastMemMultiDelJobData>
{
  async execute(data: TypeBroadcastMemMultiDelJobData, isEmitter?: boolean) {
    const { cacheName, cacheOptions, keysHash, keys } = data;
    if (!isEmitter) {
      const cache = this.app.bean.cache.mem(cacheName, cacheOptions);
      cast(cache).__mdelRaw(keysHash, keys);
    }
  }
}
