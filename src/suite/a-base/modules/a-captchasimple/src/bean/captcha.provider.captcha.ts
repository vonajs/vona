import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'captcha.provider' })
export class CaptchaProviderCaptcha extends BeanBase {
  async verify(context) {
    const { data, dataInput } = context;
    if (!data) this.ctx.throw.module(moduleInfo.relativeName, 1001);
    if (!dataInput.token || dataInput.token.toLowerCase() !== data.token.toLowerCase()) {
      this.ctx.throw.module(moduleInfo.relativeName, 1002);
    }
  }
}
