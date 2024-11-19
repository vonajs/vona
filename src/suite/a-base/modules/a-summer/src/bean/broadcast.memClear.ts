import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'broadcast' })
export class BroadcastMemClear extends BeanBase {
  async execute(context) {
    const sameAsCaller = context.sameAsCaller;
    const { fullKey, options } = context.data;
    if (!sameAsCaller) {
      const cache = this.app.bean.summer.getCache({ fullKey });
      cache.localMem.__clearRaw(options);
    }
  }
}
