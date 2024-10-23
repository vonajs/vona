export * from '../local/smsProvider.js';
export * from '../local/captcha.js';
export * from '../local/auth.js';

import { LocalSmsProvider } from '../local/smsProvider.js';
import { LocalCaptcha } from '../local/captcha.js';
import { LocalAuth } from '../local/auth.js';

export interface IModuleService {
  smsProvider: LocalSmsProvider;
  captcha: LocalCaptcha;
  auth: LocalAuth;
}
