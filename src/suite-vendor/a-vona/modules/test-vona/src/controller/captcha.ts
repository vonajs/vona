import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { Captcha } from 'vona-module-a-captcha';
import { Passport } from 'vona-module-a-user';
import { Arg, Controller, Web } from 'vona-module-a-web';
import { DtoSignin } from '../dto/signin.ts';

export interface IControllerOptionsCaptcha extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsCaptcha>({ path: 'captcha', meta: { mode: ['test', 'dev'] } })
export class ControllerCaptcha extends BeanBase {
  @Web.post('signin')
  @Passport.public()
  @Captcha.verify({ scene: 'a-captchasimple:simple' })
  async signin(@Arg.body() _user: DtoSignin) {
  }
}
