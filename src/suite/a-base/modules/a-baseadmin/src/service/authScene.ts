import { BeanBase, Service } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Service()
export class ServiceAuthScene extends BeanBase<ScopeModule> {
  get modelAuthProvider() {
    return this.getScope('a-auth').model.authProvider;
  }

  async disable({ id, sceneName, disabled }: any) {
    // item
    const item = await this.modelAuthProvider.get({ id });
    if (!item) return;
    // update
    const scenes = item.scenes ? JSON.parse(item.scenes) : {};
    if (!scenes[sceneName]) {
      scenes[sceneName] = {};
    }
    scenes[sceneName].disabled = disabled;
    item.scenes = JSON.stringify(scenes);
    await this.modelAuthProvider.update(item);
    // changed
    this.ctx.bean.authProviderCache.authProviderChanged({
      module: item.module,
      providerName: item.providerName,
    });
  }

  async save({ id, sceneName, data }: any) {
    // item
    const item = await this.modelAuthProvider.get({ id });
    if (!item) return;
    const authProvider = this.ctx.bean.authProvider.getAuthProviderBase({
      module: item.module,
      providerName: item.providerName,
    });
    // validate data
    const meta = authProvider.meta;
    const metaScene = this._getMetaScene(authProvider, sceneName);
    if (metaScene.validator.validator !== 'json') {
      await this.ctx.bean.validation.validate({
        module: metaScene.validator.module,
        validator: metaScene.validator.validator,
        data,
        filterOptions: true,
      });
    }
    // update
    if (!meta.scene) {
      item.config = JSON.stringify(data);
    } else {
      const scenes = item.scenes ? JSON.parse(item.scenes) : {};
      if (!scenes[sceneName]) {
        scenes[sceneName] = {};
      }
      scenes[sceneName] = {
        ...data,
        disabled: scenes[sceneName].disabled,
      };
      item.scenes = JSON.stringify(scenes);
    }
    await this.modelAuthProvider.update(item);
    // changed
    this.ctx.bean.authProviderCache.authProviderChanged({
      module: item.module,
      providerName: item.providerName,
    });
    // ok
    return { data };
  }

  async add({ id, sceneName, data }: any) {
    // item
    const item = await this.modelAuthProvider.get({ id });
    if (!item) return;
    // update
    const scenes = item.scenes ? JSON.parse(item.scenes) : {};
    scenes[sceneName] = data;
    item.scenes = JSON.stringify(scenes);
    await this.modelAuthProvider.update(item);
    // changed
    this.ctx.bean.authProviderCache.authProviderChanged({
      module: item.module,
      providerName: item.providerName,
    });
  }

  async delete({ id, sceneName }: any) {
    // item
    const item = await this.modelAuthProvider.get({ id });
    if (!item) return;
    // update
    const scenes = item.scenes ? JSON.parse(item.scenes) : {};
    delete scenes[sceneName];
    item.scenes = JSON.stringify(scenes);
    await this.modelAuthProvider.update(item);
    // changed
    this.ctx.bean.authProviderCache.authProviderChanged({
      module: item.module,
      providerName: item.providerName,
    });
  }

  _getMetaScene(item, sceneName) {
    const meta = item.meta;
    if (meta.scene) {
      const scene = item.scenes && item.scenes[sceneName];
      return (scene && scene.meta) || meta;
    }
    return meta;
  }
}
