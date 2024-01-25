import { BeanBase, Local } from '@cabloy/core';

const moduleInfo = module.info;

@Local()
export class LocalCaptcha extends BeanBase {
  async sendCode({ providerInstanceId, context }) {
    // sms provider
    const bean = this.ctx.bean._getBean(`${moduleInfo.relativeName}.captcha.provider.captcha`);
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
