import { Bean } from 'vona-module-a-bean';
import { BeanBase } from 'vona';

const __mailScenesConfigCache: any = {};

@Bean()
export class BeanMailSceneCache extends BeanBase {
  get configModule() {
    return this.scope.config;
  }

  getMailScenesConfigCache() {
    return __mailScenesConfigCache[this.ctx.subdomain];
  }

  getMailSceneConfigCache(sceneName) {
    return __mailScenesConfigCache[this.ctx.subdomain][sceneName];
  }

  getMailScenesConfigForAdmin() {
    let scenes = this.getMailScenesConfigCache();
    scenes = this.app.bean.util.extend({}, scenes);
    for (const sceneName in scenes) {
      const scene = scenes[sceneName];
      scene.titleLocale = this.app.text(scene.title);
    }
    return scenes;
  }

  async mailSceneChanged() {
    // change self
    await this._cacheMailScenesConfig();
    // broadcast
    this.scope.broadcast.mailSceneChanged.emit();
  }

  purgeScene(scene) {
    const res = this.app.bean.util.extend({}, scene);
    delete res.titleLocale;
    return res;
  }

  async _cacheMailScenesConfig() {
    // configDefault
    const configDefault = this.configModule.scenes;
    // configScenes
    let configScenes = await this.scope.status.get('mailScenes');
    configScenes = this.app.bean.util.extend({}, configDefault, configScenes);
    // cache
    __mailScenesConfigCache[this.ctx.subdomain] = configScenes;
  }
}
