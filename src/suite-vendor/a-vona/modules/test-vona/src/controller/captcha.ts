import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { DtoCaptchaVerify } from 'vona-module-a-captcha';
import { Arg } from 'vona-module-a-openapi';
import { Passport } from 'vona-module-a-user';
import { Controller, Web } from 'vona-module-a-web';

export interface IControllerOptionsCaptcha extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsCaptcha>({ path: 'captcha', meta: { mode: ['test', 'dev'] } })
export class ControllerCaptcha extends BeanBase {
  @Web.post('signin')
  @Passport.public()
  async signin(
    @Arg.body('username') _username: string,
    @Arg.body('password') _password: string,
    @Arg.body('captcha') captcha: DtoCaptchaVerify,
  ) {
    const verified = await this.bean.captcha.verify(captcha.id, captcha.token, 'a-captchasimple:simple');
    if (!verified) this.app.throw(403);
  }
}
