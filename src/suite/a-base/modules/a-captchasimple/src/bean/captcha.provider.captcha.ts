import { BeanTemp } from 'vona-module-a-bean';
import { BeanBase } from 'vona';

@BeanTemp({ scene: 'captcha.provider' })
export class CaptchaProviderCaptcha extends BeanBase {
  async verify(context) {
    const { data, dataInput } = context;
    if (!data) this.scope.error.CaptchaInvalid.throw();
    if (!dataInput.token || dataInput.token.toLowerCase() !== data.token.toLowerCase()) {
      this.scope.error.CaptchaMismatch.throw();
    }
  }
}
