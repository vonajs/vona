import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { Aspect } from 'vona-module-a-aspect';
import { Arg } from 'vona-module-a-openapi';
import { Passport } from 'vona-module-a-user';
import { Controller, Web } from 'vona-module-a-web';
import { DtoSignin } from '../dto/signin.ts';

export interface IControllerOptionsCaptcha extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsCaptcha>({ path: 'captcha', meta: { mode: ['test', 'dev'] } })
export class ControllerCaptcha extends BeanBase {
  @Web.post('signin')
  @Passport.public()
  @Aspect.middleware('a-captcha:captcha', { scene: 'a-captchasimple:simple' })
  async signin(@Arg.body() _user: DtoSignin) {
  }
}
