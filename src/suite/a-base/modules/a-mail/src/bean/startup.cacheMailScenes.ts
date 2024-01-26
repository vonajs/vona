import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'startup' })
export class StartupCacheMailScenes extends BeanBase {
  async execute(/* context*/) {
    // cache all mailScenes
    await this.ctx.bean.mailSceneCache._cacheMailScenesConfig();
  }
}
