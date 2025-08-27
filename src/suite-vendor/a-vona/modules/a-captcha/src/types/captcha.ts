import type { ICaptchaProviderRecord } from './captchaProvider.ts';
import type { ICaptchaSceneRecord } from './captchaScene.ts';

export interface ICaptchaDataCache {
  scene: keyof ICaptchaSceneRecord;
  provider: keyof ICaptchaProviderRecord;
  token: any;
}

export interface ICaptchaData {
  id: string;
  provider: keyof ICaptchaProviderRecord;
  payload: any;
}
