import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

export interface IControllerOptionsCaptcha extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsCaptcha>('captcha')
export class ControllerCaptcha extends BeanBase {
  async create() {}

  async refresh() {}

  async verifyImmediate() {}
}
