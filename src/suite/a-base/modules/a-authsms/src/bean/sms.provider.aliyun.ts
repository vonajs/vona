import { BeanTemp } from 'vona-module-a-bean';
import { BeanBase } from 'vona';

import * as PopCore from '@alicloud/pop-core';

@BeanTemp({ scene: 'sms.provider' })
export class SmsProviderAliyun extends BeanBase {
  async sendCode({ providerInstanceId, context, config }: any) {
    // get
    const providerInstance = await this.app.bean.captcha.getProviderInstance({ providerInstanceId });
    if (!providerInstance) this.app.throw(403);
    // token
    const token = this.__prefix0(parseInt(Math.random() * 10000), 4);
    const templateParam = { code: token };
    // params
    const params = {
      PhoneNumbers: context.mobile,
      SignName: config.signName,
      TemplateCode: config.templates[providerInstance.sceneName],
      TemplateParam: JSON.stringify(templateParam),
    };
    // send
    await this.__sendSms({ params, config });
    // ok
    return { token };
  }

  async verify({ data, dataInput }: any) {
    if (!data) this.scope.error.SMSCodeInvalid.throw();
    if (data.token !== dataInput.token) this.scope.error.SMSCodeMismatch.throw();
  }

  async __sendSms({ params, config }: any) {
    const client = new PopCore.default({
      accessKeyId: config.accessKeyId,
      accessKeySecret: config.accessKeySecret,
      endpoint: config.endpoint,
      apiVersion: config.apiVersion,
    });
    const requestOption = {
      method: 'POST',
    };
    await client.request('SendSms', params, requestOption);
  }

  __prefix0(num, length) {
    return (Array(length).join('0') + num).slice(-length);
  }
}
