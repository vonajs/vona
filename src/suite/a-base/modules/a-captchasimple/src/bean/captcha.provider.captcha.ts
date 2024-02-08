import { ScopeModule } from '../resource/this.js';
import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'captcha.provider' })
export class CaptchaProviderCaptcha extends BeanBase<ScopeModule> {
  async verify(context) {
    const { data, dataInput } = context;
    if (!data) this.scope.error.CaptchaInvalid.throw();
    if (!dataInput.token || dataInput.token.toLowerCase() !== data.token.toLowerCase()) {
      this.scope.error.CaptchaMismatch.throw();
    }
  }
}
