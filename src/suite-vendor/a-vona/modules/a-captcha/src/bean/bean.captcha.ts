import type { ICaptchaSceneOptionsProviders, ICaptchaSceneRecord } from '../types/captchaScene.ts';
import { BeanBase, deepExtend } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanCaptcha extends BeanBase {
  async create(sceneName: keyof ICaptchaSceneRecord) {
    const onionSlice = this.bean.onion.captchaScene.getOnionSlice(sceneName);
    const onionOptions = onionSlice.beanOptions.options;
    const providers = this._prepareProviders(onionOptions?.providers);
  }

  _prepareProviders(providers?: ICaptchaSceneOptionsProviders) {
    if (!providers) return;
    const providersNew: ICaptchaSceneOptionsProviders = {};
    for (const key in providers) {
      const providerOptions = providers[key];
      if (providerOptions === false) continue;
      const onionSlice = this.bean.onion.captchaProvider.getOnionSliceEnabled(true, key as any);
      if (!onionSlice) continue;
      const onionOptions = onionSlice.beanOptions.options;
      providersNew[key] = deepExtend({}, onionOptions, providerOptions);
    }
  }
}
