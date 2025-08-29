import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { Api, Arg } from 'vona-module-a-openapi';
import { Controller, Web } from 'vona-module-a-web';
import { DtoCaptchaData } from '../dto/captchaData.ts';

export interface IControllerOptionsCaptcha extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsCaptcha>('captcha')
export class ControllerCaptcha extends BeanBase {
  @Web.post('create')
  @Api.body(DtoCaptchaData)
  async create(@Arg.body('scene') scene: string) {
    return await this.bean.captcha.create(scene as any);
  }

  async refresh() {}

  async verifyImmediate() {}
}
