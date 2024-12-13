import { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerJwt extends BeanBase {
  async create() {
    const res = await this.scope.service.jwt.create({
      scene: this.ctx.request.body.scene,
    });
    this.app.success(res);
  }
}
