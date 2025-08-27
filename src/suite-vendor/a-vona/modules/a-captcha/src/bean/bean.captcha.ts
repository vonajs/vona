import type { VonaContext } from 'vona';
import type { ICaptchaProviderExecute, ICaptchaProviderRecord } from '../types/captchaProvider.ts';
import type { ICaptchaSceneOptionsProviders, ICaptchaSceneOptionsResolverResult, ICaptchaSceneRecord } from '../types/captchaScene.ts';
import { getRandomInt } from '@cabloy/utils';
import { BeanBase, beanFullNameFromOnionName, deepExtend } from 'vona';
import { Bean } from 'vona-module-a-bean';

const SymbolProviders = Symbol('SymbolProviders');

@Bean()
export class BeanCaptcha extends BeanBase {
  private [SymbolProviders]: Record<keyof ICaptchaSceneRecord, ICaptchaProviderRecord> = {} as any;

  async create(sceneName: keyof ICaptchaSceneRecord) {
    // resolve provider
    const provider = await this._resolveProvider(sceneName);
    if (!provider) throw new Error(`not found captcha provider for scene: ${sceneName}`);
    // create
    const beanFullName = beanFullNameFromOnionName(provider.name, 'captchaProvider');
    const beanInstance = this.bean._getBean<ICaptchaProviderExecute>(beanFullName as any);
    const captcha = await beanInstance.create(provider.options);
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
