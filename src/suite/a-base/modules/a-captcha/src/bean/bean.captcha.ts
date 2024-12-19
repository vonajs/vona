import { Bean } from 'vona-module-a-bean';
import { BeanModuleScopeBase } from 'vona';

import * as ModuleInfo from '@cabloy/module-info';
import utils from '../common/utils.js';

@Bean()
export class BeanCaptcha extends BeanModuleScopeBase {
  get configModule() {
    return this.scope.config;
  }

  get cacheModule() {
    return this.scope._bean.cacheRedis;
  }

  async getProvider({ module, sceneName }: any) {
    // default scene
    const sceneDefault = this.configModule.captcha.scenes.default;
    // module scene
    const configModuleScene = this.getScope(module).config;
    const sceneModule = this.app.bean.util.getProperty(configModuleScene, `captcha.scenes.${sceneName}`) || null;
    return this.app.bean.util.extend({}, sceneDefault, sceneModule);
  }

  // create provider instance
  async createProviderInstance({ module, sceneName, context }: any) {
    // provider
    const provider = await this.getProvider({ module, sceneName });
    // instance id
    const providerInstanceId = this.app.bean.util.uuidv4();
    // cache
    const key = utils.getCacheKey({ ctx: this.ctx, providerInstanceId });
    await this.cacheModule.set(key, { providerInstanceId, module, sceneName, context }, provider.timeout);
    // ok
    return { providerInstanceId, provider };
  }

  // refresh provider instance
  async refreshProviderInstance({ providerInstanceId, module, sceneName, context }: any) {
    // provider
    const provider = await this.getProvider({ module, sceneName });
    // cache
    const key = utils.getCacheKey({ ctx: this.ctx, providerInstanceId });
    await this.cacheModule.set(key, { providerInstanceId, module, sceneName, context }, provider.timeout);
    // ok
    return { providerInstanceId, provider };
  }

  // get
  async getProviderInstance({ providerInstanceId }: any) {
    const key = utils.getCacheKey({ ctx: this.ctx, providerInstanceId });
    return await this.cacheModule.get(key);
  }

  // update
  async update({ providerInstanceId, data, context }: any) {
    // key
    const key = utils.getCacheKey({ ctx: this.ctx, providerInstanceId });
    // get
    const providerInstance = await this.getProviderInstance({ providerInstanceId });
    if (!providerInstance) this.app.throw(403);
    // provider
    const provider = await this.getProvider({
      module: providerInstance.module,
      sceneName: providerInstance.sceneName,
    });
    // update
    providerInstance.data = data;
    providerInstance.context = context;
    await this.cacheModule.set(key, providerInstance, provider.timeout);
  }

  async verify({ module, sceneName, providerInstanceId, dataInput }: any) {
    // key
    const key = utils.getCacheKey({ ctx: this.ctx, providerInstanceId });
    // get
    const providerInstance = await this.getProviderInstance({ providerInstanceId });
    if (!providerInstance) this.app.throw(403);
    // check if the same scene
    if (module !== providerInstance.module || sceneName !== providerInstance.sceneName) this.app.throw(403);
    // provider
    const provider = await this.getProvider({
      module: providerInstance.module,
      sceneName: providerInstance.sceneName,
    });
    // invoke provider verify
    const _moduleInfo = ModuleInfo.parseInfo(provider.module)!;
    await this.bean.executor.newCtx(async () => {
      // todo: 需要添加verify的接口类型
      const beanFullName = `${_moduleInfo.relativeName}.captcha.provider.${provider.name}`;
      const beanInstance = this.bean._getBean(beanFullName as any);
      return await beanInstance.verify({
        providerInstanceId,
        context: providerInstance.context,
        data: providerInstance.data,
        dataInput,
      });
    });
    // // clear
    // await cache.remove(key);
    // should hold the cache item
    // update
    providerInstance.data = null;
    await this.cacheModule.set(key, providerInstance, provider.timeout);
  }
}
