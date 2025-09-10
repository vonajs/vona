import type { ICaptchaSceneRecord } from 'vona-module-a-captcha';

export interface ISchemaObjectExtensionFieldCaptcha {
  scene: keyof ICaptchaSceneRecord;
}
