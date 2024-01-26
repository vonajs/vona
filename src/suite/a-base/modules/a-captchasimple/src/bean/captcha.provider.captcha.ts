import { __ThisModule__ } from '../resource/this.js';
import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'captcha.provider' })
export class CaptchaProviderCaptcha extends BeanBase {
  async verify(context) {
    const { data, dataInput } = context;
    if (!data) this.ctx.throw.module(__ThisModule__, 1001);
    if (!dataInput.token || dataInput.token.toLowerCase() !== data.token.toLowerCase()) {
      this.ctx.throw.module(__ThisModule__, 1002);
    }
  }
}
