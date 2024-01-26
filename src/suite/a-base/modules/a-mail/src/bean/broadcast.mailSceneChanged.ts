import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'broadcast' })
export class BroadcastMailSceneChanged extends BeanBase {
  async execute(context) {
    const sameAsCaller = context.sameAsCaller;
    if (!sameAsCaller) {
      await this.ctx.bean.mailSceneCache._cacheMailScenesConfig();
    }
  }
}
