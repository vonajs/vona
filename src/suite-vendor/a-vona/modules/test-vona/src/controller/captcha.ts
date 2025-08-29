import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { Aspect } from 'vona-module-a-aspect';
import { Api, Arg } from 'vona-module-a-openapi';
import { Passport } from 'vona-module-a-user';
import { Controller, Web } from 'vona-module-a-web';

export interface IControllerOptionsCaptcha extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsCaptcha>({ path: 'captcha', meta: { mode: 'test' } })
@Api.exclude()
export class ControllerCaptcha extends BeanBase {
  @Web.post('signin')
  @Passport.public()
  @Aspect.middleware('a-captcha:captcha', { scene: 'a-captchasimple:simple' })
  async signin(
    @Arg.body('username') _username: string,
    @Arg.body('password') _password: string,
  ) {
  }
}
