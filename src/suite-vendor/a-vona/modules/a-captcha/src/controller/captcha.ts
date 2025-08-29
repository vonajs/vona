import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { Api, Arg } from 'vona-module-a-openapi';
import { Passport } from 'vona-module-a-user';
import { Controller, Web } from 'vona-module-a-web';
import { DtoCaptchaData } from '../dto/captchaData.ts';

export interface IControllerOptionsCaptcha extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsCaptcha>('captcha')
export class ControllerCaptcha extends BeanBase {
  @Web.post('create')
  @Api.body(DtoCaptchaData)
  @Passport.public()
  async create(@Arg.body('scene') scene: string) {
    return await this.bean.captcha.create(scene as any);
  }

  @Web.post('refresh')
  @Api.body(DtoCaptchaData)
  @Passport.public()
  async refresh(@Arg.body('id') id: string, @Arg.body('scene') scene: string) {
    return await this.bean.captcha.refresh(id, scene as any);
  }

  async verifyImmediate() {}
}
