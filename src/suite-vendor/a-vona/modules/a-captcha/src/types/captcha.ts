import type { ICaptchaProviderRecord } from './captchaProvider.ts';
import type { ICaptchaSceneRecord } from './captchaScene.ts';

export interface ICaptchaDataCache {
  id: string;
  sceneName: keyof ICaptchaSceneRecord;
  providerName: keyof ICaptchaProviderRecord;
  token: any;
}

export interface ICaptchaData extends ICaptchaDataCache {
  payload: any;
}
