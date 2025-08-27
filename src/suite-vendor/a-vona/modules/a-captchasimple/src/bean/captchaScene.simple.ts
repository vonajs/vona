import { BeanBase } from 'vona';
import { CaptchaScene } from 'vona-module-a-captcha';

@CaptchaScene({
  resolver: async (_ctx, _providers) => {
    return { provider: 'a-captchasimple:simple', options: undefined };
  },
  providers: {
    'a-captchasimple:simple': true,
  },
})
export class CaptchaSceneSimple extends BeanBase {}
