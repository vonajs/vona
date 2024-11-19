import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'startup' })
export class StartupCacheMailScenes extends BeanBase {
  async execute(/* context*/) {
    // cache all mailScenes
    await this.app.bean.mailSceneCache._cacheMailScenesConfig();
  }
}
