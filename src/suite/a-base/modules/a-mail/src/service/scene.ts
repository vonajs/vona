import { BeanBase, Service } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Service()
export class ServiceScene extends BeanBase<ScopeModule> {
  get statusModule() {
    return this.scope._bean.status;
  }

  async list() {
    return this.ctx.bean.mailSceneCache.getMailScenesConfigForAdmin();
  }

  async save({ sceneName, data }: any) {
    const scenes = this.ctx.bean.mailSceneCache.getMailScenesConfigCache();
    const sceneOld = scenes[sceneName];
    data = this.ctx.bean.util.extend({}, sceneOld, data);
    await this._save({ sceneName, data });
  }

  async _save({ sceneName, data }: any) {
    const scenes = this.ctx.bean.mailSceneCache.getMailScenesConfigCache();
    scenes[sceneName] = data ? this.ctx.bean.mailSceneCache.purgeScene(data) : data;
    // update
    await this.statusModule.set('mailScenes', scenes);
    // changed
    await this.ctx.bean.mailSceneCache.mailSceneChanged();
  }

  async delete({ sceneName }: any) {
    await this._save({ sceneName, data: undefined });
  }

  async add({ sceneName, data }: any) {
    data = this.ctx.bean.util.extend({}, this.scope.config.scene.default, data);
    await this._save({ sceneName, data });
  }
}
