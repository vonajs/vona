import { BeanBroadcastBase, Broadcast, IBroadcastExecute } from 'vona-module-a-broadcast';
import { IDecoratorCacheMemOptions } from '../types/cacheMem.js';
import { cast } from 'vona';

export type TypeBroadcastMemClearJobData = {
  cacheName: string;
  cacheOptions: IDecoratorCacheMemOptions;
};

@Broadcast()
export class BroadcastMemClear
  extends BeanBroadcastBase<TypeBroadcastMemClearJobData>
  implements IBroadcastExecute<TypeBroadcastMemClearJobData> {
  async execute(data: TypeBroadcastMemClearJobData, isEmitter?: boolean) {
    const { cacheName, cacheOptions } = data;
    if (!isEmitter) {
      const cache = this.app.bean.cache.mem(cacheName, cacheOptions);
      cast(cache).__clearRaw();
    }
  }
}
