import type { ICaptchaProviderRecord } from './captchaProvider.ts';
import type { ICaptchaSceneRecord } from './captchaScene.ts';

export interface ICaptchaData {
  id: string;
  sceneName: keyof ICaptchaSceneRecord;
  providerName: keyof ICaptchaProviderRecord;
  token: any;
}
