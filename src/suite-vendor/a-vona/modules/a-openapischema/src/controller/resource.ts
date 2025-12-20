import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { Passport } from 'vona-module-a-user';
import { Controller, Web } from 'vona-module-a-web';

export interface IControllerOptionsResource extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsResource>('resource', { exclude: true })
export class ControllerResource extends BeanBase {
  @Web.get('bootstrap/:resource')
  @Passport.public()
  async bootstrap() {
    // donothing
  }
}
