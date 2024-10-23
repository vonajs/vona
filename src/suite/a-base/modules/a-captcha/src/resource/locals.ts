export * from '../local/captcha.js';

import { LocalCaptcha } from '../local/captcha.js';

export interface IModuleService {
  captcha: LocalCaptcha;
}
