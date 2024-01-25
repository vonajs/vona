export * from '../local/captcha.js';

import { LocalCaptcha } from '../local/captcha.js';

export interface IModuleLocal {
  captcha: LocalCaptcha;
}
