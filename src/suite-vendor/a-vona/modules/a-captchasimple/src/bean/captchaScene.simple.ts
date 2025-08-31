import { BeanBase } from 'vona';
import { CaptchaScene } from 'vona-module-a-captcha';

@CaptchaScene({
  resolver: async (_ctx, _providers) => {
    return 'a-captchasimple:imageText';
  },
  providers: {
    'a-captchasimple:imageText': true,
  },
})
export class CaptchaSceneSimple extends BeanBase {}
