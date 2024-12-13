import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceScene extends BeanBase {
  async list() {
    return this.app.bean.mailSceneCache.getMailScenesConfigForAdmin();
  }

  async save({ sceneName, data }: any) {
    const scenes = this.app.bean.mailSceneCache.getMailScenesConfigCache();
    const sceneOld = scenes[sceneName];
    data = this.app.bean.util.extend({}, sceneOld, data);
    await this._save({ sceneName, data });
  }

  async _save({ sceneName, data }: any) {
    const scenes = this.app.bean.mailSceneCache.getMailScenesConfigCache();
    scenes[sceneName] = data ? this.app.bean.mailSceneCache.purgeScene(data) : data;
    // update
    await this.scope.status.set('mailScenes', scenes);
    // changed
    await this.app.bean.mailSceneCache.mailSceneChanged();
  }

  async delete({ sceneName }: any) {
    await this._save({ sceneName, data: undefined });
  }

  async add({ sceneName, data }: any) {
    data = this.app.bean.util.extend({}, this.scope.config.scene.default, data);
    await this._save({ sceneName, data });
  }
}
