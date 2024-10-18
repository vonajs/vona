import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'broadcast' })
export class BroadcastMemRemove extends BeanBase {
  async execute(context) {
    const sameAsCaller = context.sameAsCaller;
    const data = context.data;
    if (!sameAsCaller) {
      const moduleCache = this.ctx.cache.mem.module(data.moduleName);
      moduleCache._remove(data.name);
    }
  }
}
