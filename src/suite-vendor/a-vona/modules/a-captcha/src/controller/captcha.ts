import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { Arg } from 'vona-module-a-openapi';
import { Controller, Web } from 'vona-module-a-web';

export interface IControllerOptionsCaptcha extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsCaptcha>('captcha')
export class ControllerCaptcha extends BeanBase {
  @Web.post('create')
  async create(@Arg.body('scene') scene: string) {
    return await this.bean.captcha.create(scene as any);
  }

  async refresh() {}

  async verifyImmediate() {}
}
