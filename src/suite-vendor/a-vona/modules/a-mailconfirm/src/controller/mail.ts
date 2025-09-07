import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { Passport } from 'vona-module-a-user';
import { Arg, Controller, Web } from 'vona-module-a-web';

export interface IControllerOptionsMail extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsMail>('mail')
export class ControllerMail extends BeanBase {
  @Web.get('emailConfirm')
  @Passport.public()
  async emailConfirm(@Arg.query('token') token: string) {

  }

  @Web.get('passwordReset')
  @Passport.public()
  async passwordReset(@Arg.query('token') token: string) {

  }
}
