export * from '../bean/middleware.captchaVerify.js';
export * from '../bean/bean.captcha.js';

import { BeanCaptcha } from '../bean/bean.captcha.js';

export interface IBeanRecord {
  captcha: BeanCaptcha;
}
