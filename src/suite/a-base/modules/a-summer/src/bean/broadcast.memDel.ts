import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'broadcast' })
export class BroadcastMemDel extends BeanBase {
  async execute(context) {
    const sameAsCaller = context.sameAsCaller;
    const { fullKey, keyHash, key, options } = context.data;
    if (!sameAsCaller) {
      const cache = this.ctx.bean.summer.getCache({ fullKey });
      cache.localMem.__delRaw(keyHash, key, options);
    }
  }
}
