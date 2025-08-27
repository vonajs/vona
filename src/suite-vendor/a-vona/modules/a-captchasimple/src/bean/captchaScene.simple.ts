import { BeanBase } from 'vona';
import { CaptchaScene } from 'vona-module-a-captcha';

@CaptchaScene({
  resolver: async (_ctx, providers) => {
    return providers[0];
  },
  providers: {
    'a-captchasimple:simple': true,
  },
})
export class CaptchaSceneSimple extends BeanBase {}
