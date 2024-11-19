import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'broadcast' })
export class BroadcastMemDel extends BeanBase {
  async execute(context) {
    const sameAsCaller = context.sameAsCaller;
    const { fullKey, keyHash, key, options } = context.data;
    if (!sameAsCaller) {
      const cache = this.app.bean.summer.getCache({ fullKey });
      cache.localMem.__delRaw(keyHash, key, options);
    }
  }
}
