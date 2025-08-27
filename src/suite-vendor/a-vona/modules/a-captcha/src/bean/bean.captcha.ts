import type { ICaptchaProviderRecord } from '../types/captchaProvider.ts';
import type { ICaptchaSceneOptionsProviders, ICaptchaSceneRecord } from '../types/captchaScene.ts';
import { BeanBase, deepExtend } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanCaptcha extends BeanBase {
  async create(sceneName: keyof ICaptchaSceneRecord) {
    const onionSlice = this.bean.onion.captchaScene.getOnionSlice(sceneName);
    const onionOptions = onionSlice.beanOptions.options;
    const providers = this._prepareProviders(onionOptions?.providers);
    if (providers.length === 0) this.app.throw(404);
  }

  _prepareProviders(providers?: ICaptchaSceneOptionsProviders) {
    if (!providers) return [];
    const providersNew: (keyof ICaptchaProviderRecord)[] = [];
    for (const _key in providers) {
      const key: keyof ICaptchaProviderRecord = _key as any;
      const providerOptions = providers[key];
      if (providerOptions === false) continue;
      const onionSlice = this.bean.onion.captchaProvider.getOnionSliceEnabled(true, key);
      if (!onionSlice) continue;
      providersNew.push(key);
    }
    return providersNew;
  }
}
