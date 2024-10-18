import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../resource/this.js';
import captcha from 'trek-captcha';

@Controller()
export class ControllerCaptcha extends BeanBase<ScopeModule> {
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
