import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'broadcast' })
export class BroadcastMemMultiDel extends BeanBase {
  async execute(context) {
    const sameAsCaller = context.sameAsCaller;
    const { cacheName, cacheOptions, keysHash, keys, options } = context.data;
    if (!sameAsCaller) {
      const cache = this.app.bean.summer.cache(cacheName, cacheOptions);
      cache.localMem.__mdelRaw(keysHash, keys, options);
    }
  }
}
