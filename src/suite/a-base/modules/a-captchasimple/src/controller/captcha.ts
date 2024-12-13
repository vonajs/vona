import { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';
import captcha from 'trek-captcha';

@Controller()
export class ControllerCaptcha extends BeanBase {
  async image() {
    // providerInstanceId
    const providerInstanceId = this.ctx.query.providerInstanceId;
    // create
    const { token, buffer } = await captcha();
    // update
    await this.app.bean.captcha.update({
      providerInstanceId,
      data: { token },
    });
    // ok
    this.ctx.status = 200;
    this.ctx.type = 'image/gif';
    this.ctx.body = buffer;
  }
}
