import type { ICaptchaSceneRecord } from 'vona-module-a-captcha';

export interface ICaptchaOptions {
  scene?: keyof ICaptchaSceneRecord;
}
