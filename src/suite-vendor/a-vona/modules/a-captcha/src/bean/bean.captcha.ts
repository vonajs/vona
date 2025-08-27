import type { VonaContext } from 'vona';
import type { ICaptchaData, ICaptchaDataCache } from '../types/captcha.ts';
import type { ICaptchaProviderExecute, ICaptchaProviderRecord } from '../types/captchaProvider.ts';
import type { ICaptchaSceneOptionsProviders, ICaptchaSceneOptionsResolverResult, ICaptchaSceneRecord } from '../types/captchaScene.ts';
import { getRandomInt } from '@cabloy/utils';
import { BeanBase, beanFullNameFromOnionName, deepExtend, uuidv4 } from 'vona';
import { Bean } from 'vona-module-a-bean';

const SymbolProviders = Symbol('SymbolProviders');

@Bean()
export class BeanCaptcha extends BeanBase {
  protected [SymbolProviders]: Record<keyof ICaptchaSceneRecord, ICaptchaProviderRecord> = {} as any;

  async create(sceneName: keyof ICaptchaSceneRecord): Promise<ICaptchaData> {
    // resolve provider
    const provider = await this._resolveProvider(sceneName);
    if (!provider) throw new Error(`not found captcha provider for scene: ${sceneName}`);
    // create
    const beanFullName = beanFullNameFromOnionName(provider.name, 'captchaProvider');
    const beanInstance = this.bean._getBean<ICaptchaProviderExecute>(beanFullName as any);
    const captcha = await beanInstance.create(provider.options);
    // data
    const id = uuidv4();
    const captchaData: ICaptchaDataCache = { scene: sceneName, provider: provider.name, token: captcha.token };
    // cache
    await this.scope.cacheRedis.captcha.set(captchaData, id, { ttl: provider.options.ttl ?? this.scope.config.captchaProvider.ttl });
    // ok
    return { id, provider: provider.name, payload: captcha.payload };
  }

  async verify(id: string, token: any) {
    let captchaData = await this.getCaptchaData(id);
    if (!captchaData) return false;
    // tokenSecondary
    const tokenSecondary = captchaData.tokenSecondary;
    if (tokenSecondary) {
      return tokenSecondary === token;
    }
    // provider
    const beanFullName = beanFullNameFromOnionName(captchaData.provider, 'captchaProvider');
    const beanInstance = this.bean._getBean<ICaptchaProviderExecute>(beanFullName as any);
    const providerOptions = this._getProviderOptions(captchaData.scene, captchaData.provider)!;
    // verify
    const verified = await beanInstance.verify(captchaData.token, token, providerOptions);
    if (!verified) {
      // do nothing
      return verified;
    }
    // secondary/cache
    if (providerOptions.secondary) {
      // tokenSecondary
      const tokenSecondary = uuidv4();
      captchaData = { ...captchaData, token: undefined, tokenSecondary };
      // update cache
      await this.scope.cacheRedis.captcha.set(
        captchaData,
        id,
        { ttl: providerOptions.ttlSecondary ?? this.scope.config.captchaProvider.ttlSecondary },
      );
      // ok
      return tokenSecondary;
    } else {
      // delete cache
      await this.scope.cacheRedis.captcha.del(id);
      // ok
      return verified;
    }
  }

  async getCaptchaData(id: string) {
    return await this.scope.cacheRedis.captcha.get(id);
  }

  private _getProviderOptions(sceneName: keyof ICaptchaSceneRecord, providerName: keyof ICaptchaProviderRecord) {
    // providers
    const providers = this._getProviders(sceneName);
    return providers[providerName];
  }

  private async _resolveProvider(sceneName: keyof ICaptchaSceneRecord): Promise<ICaptchaSceneOptionsResolverResult | undefined> {
    // providers
    const providers = this._getProviders(sceneName);
    if (Object.keys(providers).length === 0) return;
    // resolver
    const onionSlice = this.bean.onion.captchaScene.getOnionSlice(sceneName);
    const onionOptions = onionSlice.beanOptions.options;
    const resolver = onionOptions?.resolver ?? resolverDefault;
    const providerName = await resolver(this.ctx, providers);
    if (!providerName) return;
    return { name: providerName, options: providers[providerName] };
  }

  private _getProviders(sceneName: keyof ICaptchaSceneRecord) {
    if (!this[SymbolProviders][sceneName]) {
      const onionSlice = this.bean.onion.captchaScene.getOnionSlice(sceneName);
      const onionOptions = onionSlice.beanOptions.options;
      this[SymbolProviders][sceneName] = this._prepareProviders(onionOptions?.providers);
    }
    return this[SymbolProviders][sceneName];
  }

  private _prepareProviders(providers?: ICaptchaSceneOptionsProviders): ICaptchaProviderRecord {
    if (!providers) return {} as any;
    const providersNew: ICaptchaProviderRecord = {} as any;
    for (const _key in providers) {
      const key: keyof ICaptchaProviderRecord = _key as any;
      const providerOptions = providers[key];
      if (providerOptions === false) continue;
      const onionSlice = this.bean.onion.captchaProvider.getOnionSliceEnabled(true, key);
      if (!onionSlice) continue;
      providersNew[key] = deepExtend({}, onionSlice.beanOptions.options, providerOptions);
    }
    return providersNew;
  }
}

async function resolverDefault(_ctx: VonaContext, providers: ICaptchaProviderRecord): Promise<keyof ICaptchaProviderRecord> {
  const keys = Object.keys(providers);
  const index = getRandomInt(keys.length, 0);
  return keys[index] as keyof ICaptchaProviderRecord;
}
