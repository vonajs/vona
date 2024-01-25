import { BeanBase, Local } from '@cabloy/core';
import { __ThisModule__ } from '../resource/this.js';

@Local()
export class LocalCaptcha extends BeanBase {
  async sendCode({ providerInstanceId, context }) {
    // sms provider
    const bean = this.ctx.bean._getBean(`${__ThisModule__}.captcha.provider.captcha`);
    const { provider, config } = bean.__createSMSProvider();
    // sendCode
    const data = await provider.sendCode({ providerInstanceId, context, config });
    // update
    await this.ctx.bean.captcha.update({
      providerInstanceId,
      data,
      context,
    });
  }
}
