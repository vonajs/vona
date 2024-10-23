import { BeanBase, Service } from 'vona';
import { CaptchaProviderCaptcha } from '../index.js';

@Service()
export class ServiceCaptcha extends BeanBase {
  async sendCode({ providerInstanceId, context }: any) {
    // sms provider
    const bean = this.ctx.bean._getBean(CaptchaProviderCaptcha);
    const { provider, config } = bean.__createSMSProvider();
    // sendCode
    const data = await (<any>provider).sendCode({ providerInstanceId, context, config });
    // update
    await this.ctx.bean.captcha.update({
      providerInstanceId,
      data,
      context,
    });
  }
}
