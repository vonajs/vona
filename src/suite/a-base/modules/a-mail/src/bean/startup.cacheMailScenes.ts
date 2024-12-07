import { BeanBase, IStartupExecute, Startup } from 'vona';

@Startup({ instance: true })
export class StartupCacheMailScenes extends BeanBase implements IStartupExecute {
  async execute() {
    // cache all mailScenes
    await this.app.bean.mailSceneCache._cacheMailScenesConfig();
  }
}
