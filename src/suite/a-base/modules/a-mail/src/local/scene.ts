import { BeanBase, Local } from '@cabloy/core';
import { __ThisModule__ } from '../resource/this.js';

@Local()
export class LocalScene extends BeanBase {
  get statusModule() {
    return this.ctx.bean.status.module(__ThisModule__);
  }

  async list() {
    return this.ctx.bean.mailSceneCache.getMailScenesConfigForAdmin();
  }

  async save({ sceneName, data }) {
    const scenes = this.ctx.bean.mailSceneCache.getMailScenesConfigCache();
    const sceneOld = scenes[sceneName];
    data = this.ctx.bean.util.extend({}, sceneOld, data);
    await this._save({ sceneName, data });
  }

  async _save({ sceneName, data }) {
    const scenes = this.ctx.bean.mailSceneCache.getMailScenesConfigCache();
    scenes[sceneName] = data ? this.ctx.bean.mailSceneCache.purgeScene(data) : data;
    // update
    await this.statusModule.set('mailScenes', scenes);
    // changed
    await this.ctx.bean.mailSceneCache.mailSceneChanged();
  }

  async delete({ sceneName }) {
    await this._save({ sceneName, data: undefined });
  }

  async add({ sceneName, data }) {
    data = this.ctx.bean.util.extend({}, this.ctx.config.scene.default, data);
    await this._save({ sceneName, data });
  }
}
