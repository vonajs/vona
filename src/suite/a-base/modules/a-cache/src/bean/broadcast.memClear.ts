import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'broadcast' })
export class BroadcastMemClear extends BeanBase {
  async execute(context) {
    const sameAsCaller = context.sameAsCaller;
    const data = context.data;
    if (!sameAsCaller) {
      const moduleCache = this.ctx.cache.mem.module(data.moduleName);
      moduleCache._clear();
    }
  }
}
