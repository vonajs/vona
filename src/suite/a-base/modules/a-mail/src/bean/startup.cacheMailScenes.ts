import { BeanBase } from 'vona';
import { IStartupExecute, Startup } from 'vona-module-a-startup';

@Startup({ instance: true })
export class StartupCacheMailScenes extends BeanBase implements IStartupExecute {
  async execute() {
    // cache all mailScenes
    await this.app.bean.mailSceneCache._cacheMailScenesConfig();
  }
}
