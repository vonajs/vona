import { BeanBase, Controller } from 'vona';

@Controller()
export class ControllerJwt extends BeanBase {
  async create() {
    const res = await this.scope.service.jwt.create({
      scene: this.ctx.request.body.scene,
    });
    this.app.success(res);
  }
}
