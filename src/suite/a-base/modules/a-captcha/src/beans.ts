import middlewareCaptchaVerify from './bean/middleware.captchaVerify.js';
import beanCaptcha from './bean/bean.captcha.js';

export default {
  // middleware
  'middleware.captchaVerify': {
    bean: middlewareCaptchaVerify,
  },
  // global
  captcha: {
    bean: beanCaptcha,
    global: true,
  },
};
