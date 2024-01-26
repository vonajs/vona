import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'broadcast' })
export class BroadcastMemClear extends BeanBase {
  async execute(context) {
    const sameAsCaller = context.sameAsCaller;
    const { fullKey, options } = context.data;
    if (!sameAsCaller) {
      const cache = this.ctx.bean.summer.getCache({ fullKey });
      cache.localMem.__clearRaw(options);
    }
  }
}
