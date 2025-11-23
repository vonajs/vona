import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { Controller, Web } from 'vona-module-a-web';

export interface IControllerOptionsPlay extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsPlay>('play')
export class ControllerPlay extends BeanBase {
  @Web.post()
  async index() {
    return 'Hello World';
  }
}
