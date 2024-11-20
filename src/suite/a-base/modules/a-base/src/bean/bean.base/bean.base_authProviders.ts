import { BeanBaseAtomClasses } from './bean.base_atomClasses.js';

const _authProvidersLocales: any = {};

export class BeanBaseAuthProviders extends BeanBaseAtomClasses {
  authProviders() {
    if (!_authProvidersLocales[this.ctx.locale]) {
      _authProvidersLocales[this.ctx.locale] = this._prepareAuthProviders();
    }
    return _authProvidersLocales[this.ctx.locale];
  }

  _prepareAuthProviders() {
    const authProviders: any = {};
    for (const module of this.ctx.app.meta.modulesArray) {
      const relativeName = module.info.relativeName;
      let metaAuth = module.meta && module.meta.auth;
      if (!metaAuth) continue;
      if (typeof metaAuth === 'function') {
        metaAuth = metaAuth(this.ctx.app);
      }
      if (!metaAuth.providers) continue;
      // loop
      for (const providerName in metaAuth.providers) {
        const _authProvider = metaAuth.providers[providerName];
        const providerFullName = `${relativeName}:${providerName}`;
        if (!_authProvider.meta.title) {
          throw new Error(`should specify the title of auth provider: ${providerFullName}`);
        }
        const authProvider = this.app.bean.util.extend({}, _authProvider);
        this._prepareAuthProvider(relativeName, providerName, authProvider);
        authProviders[providerFullName] = authProvider;
      }
    }
    return authProviders;
  }

  _prepareAuthProvider(relativeName, _providerName, authProvider) {
    const meta = authProvider.meta;
    meta.titleLocale = this.app.text(meta.title);
    // meta
    this._prepareAuthProvider_meta(relativeName, meta);
    // scenes
    const scenes = authProvider.scenes;
    if (scenes) {
      for (const sceneName in scenes) {
        const scene = scenes[sceneName];
        this._prepareAuthProvider_meta(relativeName, scene.meta);
        scene.meta = this._prepareAuthProvider_mergeMetaScene(scene.meta, meta);
      }
    }
  }

  _prepareAuthProvider_mergeMetaScene(metaScene, metaConfig) {
    const _meta: any = {};
    for (const key of ['mode', 'inner', 'inline', 'disableAssociate', 'render', 'validator']) {
      if (metaConfig[key] !== undefined) {
        _meta[key] = metaConfig[key];
      }
    }
    return this.app.bean.util.extend({}, _meta, metaScene);
  }

  _prepareAuthProvider_meta(relativeName, meta) {
    if (typeof meta.bean === 'string') {
      meta.bean = { module: relativeName, name: meta.bean };
    }
    if (typeof meta.render === 'string') {
      meta.render = { module: relativeName, name: meta.render };
    }
    if (typeof meta.validator === 'string') {
      meta.validator = { module: relativeName, validator: meta.validator };
    }
  }
}
