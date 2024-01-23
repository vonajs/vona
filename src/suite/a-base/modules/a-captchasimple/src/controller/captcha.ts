import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleACaptchasimple } from '../index.js';
const captcha = require('trek-captcha');

@Controller()
export class ControllerCaptcha extends BeanBase {
  @Use()
  scope: ScopeModuleACaptchasimple;

  async image() {
    // providerInstanceId
    const providerInstanceId = this.ctx.query.providerInstanceId;
    // create
    const { token, buffer } = await captcha();
    // update
    await this.ctx.bean.captcha.update({
      providerInstanceId,
      data: { token },
    });
    // ok
    this.ctx.status = 200;
    this.ctx.type = 'image/gif';
    this.ctx.body = buffer;
  }
}
