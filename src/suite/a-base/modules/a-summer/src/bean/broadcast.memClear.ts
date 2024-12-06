import { Bean, BeanBase, cast } from 'vona';

@Bean({ scene: 'broadcast' })
export class BroadcastMemClear extends BeanBase {
  async execute(context) {
    const sameAsCaller = context.sameAsCaller;
    const { cacheName, cacheOptions, options } = context.data;
    if (!sameAsCaller) {
      const cache = this.app.bean.summer.cache(cacheName, cacheOptions);
      cast(cache).localMem.__clearRaw(options);
    }
  }
}
